import type { NextPage } from 'next'

import { SearchIcon } from '@heroicons/react/solid'
import { UserCircleIcon, BriefcaseIcon } from '@heroicons/react/outline'

import Link from 'next/link'
import Image from 'next/image'

const NavBar: React.FC = () => (
  <div className='bg-[#04111d] w-full px-4  py-3 grid grid-cols-3 relative '>
    <Link href={"/"} >
      <h1 className='text-white text-2xl font-bold self-center hover:text-gray-400 cursor-pointer'>OpenSea</h1>
    </Link>
    <div className='w-full flex bg-white px-2 rounded-md ring-0 ring-offset-4 focus-within:outline-blue-400 focus-within:ring-blue-400 focus-within:ring-2'>
      <SearchIcon className='w-9' />
      <input
        placeholder='Search items, collections and accounts'
        className='p-3 w-full bg-transparent outline-none'
      />
    </div>

    <div className='w-full flex flex-row justify-end h-full items-center'>
      <Link href={"/collections/0x257B07F6fAb614f07EA7440C15B6eE2B41f16eB5"}>
        <h1 className='text-white text-base font-bold px-2 hover:text-gray-400 cursor-pointer'>Collection</h1>
      </Link>
      <Link href={"/stats/"}>
        <h1 className='text-white text-base font-bold px-2 hover:text-gray-400 cursor-pointer'>Stats</h1>
      </Link>
      <Link href={"/resources/"}>
        <h1 className='text-white text-base font-bold px-2 hover:text-gray-400 cursor-pointer'>Resources</h1>
      </Link>
      <Link href={"/create"}>
        <h1 className='text-white text-base font-bold px-2 hover:text-gray-400 cursor-pointer'>Create</h1>
      </Link>
      <Link href={"/profile"}>
        <UserCircleIcon className='w-10 text-white px-2 hover:text-gray-400 cursor-pointer' />
      </Link>
      <Link href={"/wallet"}>
        <BriefcaseIcon className='w-10 text-white px-2 hover:text-gray-400 cursor-pointer' />
      </Link>
    </div>
  </div>
)

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-hero-pattern">
      {/* Header component */}
      <NavBar />

      {/* Body */}
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


    </div>
  )
}

export default Home
