import { useWeb3 } from '@3rdweb/hooks'
import { NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk'
import NavBar from '@common/NavBar/NavBar'
import { HeartIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

const NFTCard: React.FC<{
    src: string
}> = ({ src }) => (
    <div
        className="w-full h-full grid grid-rows-[10% auto] border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg"
    >
        <header className='flex justify-end w-full p-3 '>
            <HeartIcon className='w-4 h-4 hover:bg-red-600 hover:border' />
        </header>
        <div className='row-span-4 w-full overflow-hidden flex justify-center items-center'>
            <img src={src} alt="" className='w-full h-full object-cover' />
        </div>

    </div>
)


const Nft: NextPage = () => {
    const router = useRouter();
    const { provider } = useWeb3()

    const [selectedNft, setSelectedNft] = useState<NFTMetadata>()
    const [listings, setListings] = useState([])

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            { readOnlyRpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/W-sRsXIP5C7ASwsz5v6bSbNZqJ7NcNe3" }
        )
        return sdk.getNFTModule('0x257B07F6fAb614f07EA7440C15B6eE2B41f16eB5')
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
            const nft = nfts.find((nft) => nft.id === router.query.nftId)
            setSelectedNft(nft);
        })()
    }, [nftModule])

    useEffect(() => {
        if (!marketPlaceModule) return
        (async () => {
            const listing = await marketPlaceModule.getAllListings()
            setListings(listing);
        })()
    }, [marketPlaceModule])

    return (
        <div className='w-screen h-screen' >
            <NavBar />
            <div className='mx-10 mt-6 grid grid-rows-4 grid-cols-3 gap-6'>
                <div className='row-span-2 '>
                    <NFTCard key={1} src={selectedNft?.image as string} />
                </div>
                <div className=' col-start-2 col-span-2 p-6 '>
                    <h1 className='text-4xl font-bold'>{selectedNft?.name}</h1>
                    <p className='text-base text-gray-300 w-full mt-6'>Owned by <span className='text-blue-400'>e88vault</span></p>
                </div>
                <div className='col-start-2 col-span-2 p-6 border border-gray-200 rounded-2xl '>
                    <h1 className='text-base text-gray-300 '>Current price</h1>
                    <p className='text-4xl font-bold mt-6 flex flex-row'>
                        <img
                            src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                            alt="eth"
                            className='h-10 mr-2'
                        /> {listings.find((l) => l.asset.id === selectedNft?.id)?.buyoutCurrencyValuePerToken.displayValue}
                    </p>
                    <div className='flex flex-row mt-3 '>
                        <button className='bg-[#2181e2] px-12 py-4 text-lg text-white font-semibold rounded-md hover:bg-[#42a0ff] cursor-pointer'>
                            Explore
                        </button>
                        <button className='ml-6 border border-[#2181e2] bg-white px-12 py-4 text-lg text-[#2181e2] font-semibold rounded-md hover:border-[#42a0ff] cursor-pointer'>
                            Create
                        </button>
                    </div>
                </div>

                <div className='col-span-3 row-span-2 mb-3 border border-gray-200 rounded-2xl grid-rows-[10% auto]'>
                    <div className='p-3 border-b border-gray-200'>Item Activity</div>

                    <table className='w-full'>
                        <thead className=' bg-gray-100'>
                            <tr>
                                <th>Event</th>
                                <th>Price</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                    </table>

                </div>
            </div>

        </div >
    )
}

export default Nft;