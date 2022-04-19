import type { NextPage } from 'next'


import { useWeb3 } from '@3rdweb/hooks'
import { useEffect } from 'react'
import { client } from "@utils/sanityClient"
import NavBar from '@common/NavBar/NavBar'



const Body: React.FC = () => (
  <div className='w-[76em] m-auto flex mt-6 items-center'>
    <div>
      <h1 className='text-4xl text-[#04111d] font-bold text-left mb-3'>Discover, collect, and sell extraordinary NFTs</h1>
      <h1 className='text-2xl text-[#04111d] text-left'>Discover, collect, and sell extraordinary NFTs</h1>
      <div className='flex flex-row mt-3 '>
        <button className='bg-[#2181e2] px-12 py-4 text-lg text-white font-semibold rounded-md hover:bg-[#42a0ff] cursor-pointer'>
          Explore
        </button>
        <button className='ml-6 border border-[#2181e2] bg-white px-12 py-4 text-lg text-[#2181e2] font-semibold rounded-md hover:border-[#42a0ff] cursor-pointer'>
          Create
        </button>
      </div>
    </div>
    <img
      src={"https://lh3.googleusercontent.com/H-LDthYRKPWJdIKEI3WrZFFpxetO77jl1ALd3t4BJQ3Qj661B3WfopzTJ1iNtjD4JqjsLLqblkfWNtaHEzRUsCcbLsUZEiVGkNGE=s0"}
      className=" w-[38em] h-[28em] rounded-md"
    />

  </div>
)

const Home: NextPage = () => {
  const { address, connectWallet } = useWeb3();

  useEffect(() => {
    if (address) {
      (async () => {
        const userDoc = {
          _type: 'users',
          _id: address,
          userName: 'Unnamed',
          walletAddress: address,
        }

        const result = await client.createIfNotExists(userDoc)
      })()
    }

  }, [address])
  return (
    <>
      {address && (
        <div className="w-screen h-screen bg-hero-pattern">
          {/* Header component */}
          <NavBar />
          {/* Body */}
          <Body />
        </div>
      )}

      {!address && (
        <div className='w-screen h-screen flex items-center justify-center'>
          <button
            className='bg-[#2181e2] px-12 py-4 text-lg text-white font-semibold rounded-md hover:bg-[#42a0ff] cursor-pointer'
            onClick={() => connectWallet('injected')}
          >
            Connect to wallet
          </button>
        </div>
      )}
    </>
  )
}

export default Home
