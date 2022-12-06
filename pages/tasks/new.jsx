import { useRouter } from 'next/router';
import React from 'react';
import useNewTaskReducer from '../../hooks/useNewTaskReducer';

export default function NewTaskPage({ people }) {
  const [values, dispatch] = useNewTaskReducer();
  const URI = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    validator();
    const { title, description, startDate, personId } = values;
    if (
      title !== '' &&
      description !== '' &&
      startDate !== '' &&
      personId !== 'none'
    ) {
      const data = {
        title: values.title,
        description: values.description,
        completed: false,
        startDate: values.startDate,
        endDate: values.endDate,
        personId: values.personId,
      };
      try {
        const res = await fetch(`${URI}/tasks`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        });
        const task = await res.json();
        router.push(`/profile/${task.personId}`);
      } catch {
        dispatch({ type: 'requestError' });
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: 'changeOption', payload: { name, value } });
    const { title, description, startDate, personId } = values.error;
    if (title || description || startDate || personId) {
      validator();
    }
  }

  function validator() {
    if (values.title === '') {
      dispatch({ type: 'error', payload: { name: 'title' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'title' } });
    }

    if (values.description === '') {
      dispatch({ type: 'error', payload: { name: 'description' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'description' } });
    }

    if (values.startDate === '') {
      dispatch({ type: 'error', payload: { name: 'startDate' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'startDate' } });
    }

    if (values.personId === 'none') {
      dispatch({ type: 'error', payload: { name: 'personId' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'personId' } });
    }
  }

  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3 text-pink-500'>
        Create a new task
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center px-4 md:w-[30rem] mx-auto'
      >
        <label htmlFor='title' className='text-sm text-gray-500'>
          Title
        </label>
        <input
          value={values.title}
          onChange={handleChange}
          type='text'
          name='title'
          id='title'
          placeholder='New task'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.title && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='description' className='text-sm text-gray-500'>
          Description
        </label>
        <textarea
          value={values.description}
          onChange={handleChange}
          type='text'
          name='description'
          id='description'
          placeholder='Type de content of task'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.description && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='nickname' className='text-sm text-gray-500'>
          Start Date
        </label>
        <input
          value={values.startDate}
          onChange={handleChange}
          type='date'
          name='startDate'
          id='startDate'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.startDate && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='endDate' className='text-sm text-gray-500'>
          End Date
        </label>
        <input
          value={values.endDate}
          onChange={handleChange}
          type='date'
          name='endDate'
          id='endDate'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        <label htmlFor='personId' className='text-sm text-gray-500'>
          Select a task owner
        </label>
        <select
          name='personId'
          id='personId'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
          value={values.personId}
          onChange={handleChange}
        >
          <option value='none' className='text-center'>
            --Choose--
          </option>
          {people.map((person) => {
            return (
              <option key={person.id} value={person.id}>
                {person.fullName}
              </option>
            );
          })}
        </select>
        {values.error.personId && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <button className='border border-pink-400 p-1 py-2 rounded-lg w-full text-pink-500 my-1'>
          Send
        </button>
      </form>
    </section>
  );
}

export async function getServerSideProps() {
  const URI = process.env.API_URL;
  const res = await fetch(`${URI}/people`);
  const data = await res.json();
  return {
    props: {
      people: data,
    },
  };
}
