import React from 'react';
import Image from 'next/image';
import { IconSettings } from '@tabler/icons';
import Link from 'next/link';

export default function PeopleDetailCard({ person }) {
  return (
    <div className='border rounded-lg'>
      <div className='flex items-center justify-between pr-3'>
        <div className='flex items-center p-3'>
          <Image
            src={person.picture}
            alt={`profile photo of ${person.fullName}`}
            width={60}
            height={60}
            className='rounded-full'
          />
          <div className='ml-3'>
            <p className='font-bold'>{person.nickname}</p>
            <p className='text-sm text-gray-400'>{person.fullName}</p>
          </div>
        </div>
        <Link href={`/profile/${person.id}/edit`}>
          <span className='underline text-sm text-gray-500'>Edit profile</span>
        </Link>
      </div>
      <div className='border-t'></div>
      <ul className='p-3'>
        <li>
          <strong>Occupation:</strong> {person.occupation}
        </li>
        <li>
          <strong>Age:</strong> {person.age}
        </li>
        <li>
          <strong>Gender:</strong> {person.gender}
        </li>
      </ul>
    </div>
  );
}
