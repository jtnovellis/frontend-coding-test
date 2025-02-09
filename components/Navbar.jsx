import { IconMenu2, IconX } from '@tabler/icons';
import Link from 'next/link';
import React, { useState } from 'react';

const pages = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'New user',
    link: '/profile/new',
  },
  {
    label: 'New task',
    link: '/tasks/new',
  },
];

export default function Navbar() {
  const [isDropped, setIsDropped] = useState(false);
  const routes = pages.map((route) => {
    return (
      <li key={route.label} className='p-4 md:p-2 cursor-pointer'>
        <Link href={route.link}>
          <span onClick={() => setIsDropped((prev) => !prev)}>
            {route.label}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <header className='p-4 fixed top-0 sm:p-6 w-full bg-white z-20'>
      <nav className='border border-white rounded-lg p-3 sm:p-5 flex justify-between items-center shadow-2xl lg:max-w-6xl md:mx-auto'>
        <Link href='/'>
          <p className='text-3xl text-pink-500 cursor-pointer'>datasketch</p>
        </Link>
        <div className='lg:hidden pt-1'>
          {isDropped ? (
            <div className='fixed top-0 left-0 w-screen h-screen bg-white p-7 text-pink-500'>
              <div className='flex justify-between items-center mb-11'>
                <p className='text-3xl text-pink-500'>datasketch</p>
                <button onClick={() => setIsDropped((prev) => !prev)}>
                  <IconX />
                </button>
              </div>
              <div className=''>
                <ul className='font-bold text-xl'>{routes}</ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsDropped((prev) => !prev)}
              className='text-pink-500'
            >
              <IconMenu2 />
            </button>
          )}
        </div>
        <ul className='hidden lg:flex font-bold text-xl m-0 text-pink-500'>
          {routes}
        </ul>
      </nav>
    </header>
  );
}
