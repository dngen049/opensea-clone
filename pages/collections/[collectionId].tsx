import { useWeb3 } from '@3rdweb/hooks';
import { AuctionListing, DirectListing, NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk'
import NavBar from '@common/NavBar/NavBar';
import { client } from '@utils/sanityClient';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react';
import { HeartIcon } from "@heroicons/react/outline"
import Router from 'next/router'


const NFTCard: React.FC<{
    src: string
    key: string | number;
    id: string;
    title: string;
    name: string;
    isListed: boolean;
    price: string
}> = ({ src, key, id, title, name, isListed, price }) => (
    <div
        onClick={() => {
            Router.push({
                pathname: `/nfts/${id}`,
                query: { isListed: isListed },
            })
        }}
        key={key}
        className="grid grid-rows-7 border border-gray-200 w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg"
    >
        <div className='row-span-4 w-full overflow-hidden flex justify-center items-center'>
            <img src={src} alt="" className='w-full h-full object-cover' />
        </div>
        <div className='mt-4 mx-2'>
            <div className='flex flex-row justify-between'>
                <div>
                    <p className='text-sm text-gray-400'>{title}</p>
                    <p className=' text-base font-semibold'>{name}</p>
                </div>
                <div>
                    <p className='text-sm text-gray-400'>Price</p>
                    <p className='text-base font-semibold flex flex-row'>
                        <img
                            src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                            alt="eth"
                            className='h-6 mr-2'
                        /> {price}</p>
                </div>
            </div>
        </div>
        <footer className='flex justify-end w-full p-3 bg-gray-100'>
            <HeartIcon className='w-4 h-4 hover:bg-red-600 hover:border' />
        </footer>
    </div>
)

const Collection: NextPage = () => {
    const router = useRouter();
    const { provider } = useWeb3()
    const [collection, setCollection] = useState()
    const [listing, setListing] = useState<(AuctionListing | DirectListing)[]>()
    const [nfts, setNfts] = useState<NFTMetadata[]>()

    const query = (collectionId: string) => `*[_type == "marketItems" && contractAddress == "${collectionId}"] {
        "imageUrl" : profileImage.asset->url,
        "bannerImageUrl": bannerImage.asset->url,
        "creator": createdBy->userName,
        "allOwners": owners[]->,
        title,
        description,
        volumeTraded,
        floorPrice,
        createdBy,
        contractAddress
    }
    `

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            { readOnlyRpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/W-sRsXIP5C7ASwsz5v6bSbNZqJ7NcNe3" }
        )
        const collectionId = router.query.collectionId
        return sdk.getNFTModule(collectionId as string)
    }, [provider])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return
        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            { readOnlyRpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/W-sRsXIP5C7ASwsz5v6bSbNZqJ7NcNe3" }
        )
        return sdk.getMarketplaceModule(
            "0x1f468Fd16653eF17817EAEcD86F6601239353450"
        )
    }, [provider])

    useEffect(() => {
        if (!nftModule) return
        (async () => {
            const nfts = await nftModule.getAll()
            setNfts(nfts);
        })()
    }, [nftModule])

    useEffect(() => {
        if (!marketPlaceModule) return
        (async () => {
            const listing = await marketPlaceModule.getAllListings()
            setListing(listing);
        })()
    }, [marketPlaceModule])

    useEffect(() => {
        (async () => {
            const collectionData = await client.fetch(query(router.query.collectionId as string))
            setCollection(collectionData[0]);
        })()
    }, [router.query.collectionId])


    return (
        <div className='w-screen h-screen'>
            <NavBar />
            <div className='h-[24vh] w-full overflow-hidden'>
                <img src={collection?.bannerImageUrl} className="w-full object-cover" />
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <img src={collection?.imageUrl} className="w-40 h-40 mt-[-4em]" />
                <h1 className='text-4xl font-bold'>{collection?.title}</h1>
                <h3 className='text-base font-medium mt-3'>Created By <a href='' className='text-blue-400'>{collection?.creator}</a></h3>
                <div className='flex flex-row flex-wrap border border-gray-300 rounded-md'>
                    <div className=' box-border border-r border-gray-300 flex flex-col text-center justify-center w-28 h-20 hover:shadow-2xl'>
                        <h1 className='font-bold text-xl'>{nfts?.length}</h1>
                        <h3 className='font-medium text-base text-gray-400'>items</h3>
                    </div>
                    <div className='box-border border-r border-gray-300 flex flex-col text-center justify-center w-28 h-20 hover:shadow-2xl'>
                        <h1 className='font-bold text-xl'>{collection?.allOwners.length}</h1>
                        <h3 className='font-medium text-base text-gray-400'>owners</h3>
                    </div>
                    <div className='box-border border-r border-gray-300 flex flex-col text-center justify-center w-28 h-20 hover:shadow-2xl'>
                        <h1 className='font-bold text-xl flex justify-center'>
                            <img
                                src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                alt="eth"
                                className='h-6 mr-2'
                            />{collection?.floorPrice}</h1>
                        <h3 className='font-medium text-base text-gray-400'>floor price</h3>
                    </div>
                    <div className='box-border flex flex-col text-center justify-center w-28 h-20 hover:shadow-2xl'>
                        <h1 className='font-bold text-xl flex justify-center'>
                            <img
                                src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                alt="eth"
                                className='h-6 mr-2'
                            /> {collection?.volumeTraded}.5k</h1>
                        <h3 className='font-medium text-base text-gray-400'>volume traded</h3>
                    </div>
                </div>

                <p className='text-base font-medium mt-3'>
                    {collection?.description}
                </p>
                {router.query.collectionId}

                <div className='flex flex-wrap justify-center w-full'>
                    {nfts?.map((nft, i) => {
                        const list = listing?.find((l) => l.asset.id === nft.id)

                        return <NFTCard
                            key={i}
                            id={nft.id}
                            src={nft?.image as string}
                            price={list?.buyoutCurrencyValuePerToken.displayValue}
                            name={nft?.name}
                            isListed={list !== undefined}
                            title={collection?.title} />
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Collection;