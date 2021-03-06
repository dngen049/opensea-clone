import React from "react"
import { SearchIcon, UserCircleIcon, BriefcaseIcon } from "@heroicons/react/solid";
import Link from "next/link";

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

export default NavBar;