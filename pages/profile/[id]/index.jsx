import React from 'react';
import PeopleDetailCard from '../../../components/PeopleDetailCard';

export default function DetailPage({ person }) {
  return (
    <section className='p-4'>
      <PeopleDetailCard person={person} />
      <div></div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const URI = process.env.API_URL;
  const { id } = context.params;
  const res = await fetch(`${URI}/people/${id}`);
  const data = await res.json();
  return {
    props: {
      person: data,
    },
  };
}
