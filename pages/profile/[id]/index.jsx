import React from 'react';
import ItemList from '../../../components/ItemList';
import PeopleDetailCard from '../../../components/PeopleDetailCard';

export default function DetailPage({ person, tasks }) {
  return (
    <section className='p-4'>
      <PeopleDetailCard person={person} />
      <h1 className='text-lg text-center font-bold pt-2 text-pink-500'>
        Tasks List
      </h1>
      <div>
        {tasks.map((task) => (
          <ItemList task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const URI = process.env.API_URL;
  const { id } = context.params;
  const resPeople = await fetch(`${URI}/people/${id}`);
  const dataPeople = await resPeople.json();
  const resTasks = await fetch(`${URI}/tasks?personId=${id}`);
  const dataTasks = await resTasks.json();
  return {
    props: {
      person: dataPeople,
      tasks: dataTasks,
    },
  };
}
