import { IconChevronLeft } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useTaskFormReducer from '../../../hooks/useTaskFormReducer';

export default function TaskEditPage({ task }) {
  const [values, dispatch] = useTaskFormReducer(task);
  const router = useRouter();
  const URI = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const startDate = values.task.startDate;
    const endDate = values.task.endDate;
    if (endDate) {
      if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
        const data = {
          title: values.task.title,
          description: values.task.description,
          completed: true,
          startDate: values.task.startDate,
          endDate: values.task.endDate,
          personId: values.task.personId,
        };
        (async () => {
          await fetch(`${URI}/tasks/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json',
            },
          });
        })();
      }
    }
  }, [values, URI, task]);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: 'changeOption', payload: { name, value } });
  }

  async function handleClick() {
    const data = {
      title: values.task.title,
      description: values.task.description,
      completed: values.task.completed,
      startDate: values.task.startDate,
      endDate: values.task.endDate,
      personId: values.task.personId,
    };
    try {
      await fetch(`${URI}/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      dispatch({ type: 'defaultStatus' });
    } catch {
      dispatch({ type: 'error' });
    }
  }

  return (
    <section className='p-4'>
      <div className='flex justify-between px-1'>
        <h1 className='text-3xl text-center font-bold my-3 text-pink-500'>
          Task edition
        </h1>
        <button
          onClick={() => router.push(`/profile/${task.personId}`)}
          className='flex justify-between items-center text-gray-500'
        >
          <IconChevronLeft />
          <span>Go back</span>
        </button>
      </div>
      <form>
        <div className='flex items-center border-t p-3'>
          <div className='py-3 p-2'>
            <label htmlFor='title' className='text-sm text-gray-500'>
              Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              disabled={values.status.title}
              value={values.task.title}
              onChange={handleChange}
              className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
            />
          </div>
          {values.status.title ? (
            <button
              onClick={() => dispatch({ type: 'titleStatus' })}
              className='border border-pink-400 rounded-lg w-[8rem] p-3 text-pink-500 my-1'
            >
              Change
            </button>
          ) : (
            <div className='flex items-end flex-col'>
              <button
                onClick={handleClick}
                className='border border-pink-400 rounded-lg w-[6.5rem] text-pink-500 mb-2'
              >
                Save
              </button>
              <button
                onClick={() => dispatch({ type: 'titleStatus' })}
                className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className='flex items-center border-t p-3'>
          <div className='py-3 p-2'>
            <label htmlFor='description' className='text-sm text-gray-500'>
              Description
            </label>
            <textarea
              type='text'
              name='description'
              id='description'
              disabled={values.status.description}
              value={values.task.description}
              onChange={handleChange}
              className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
            />
          </div>
          {values.status.description ? (
            <button
              onClick={() => dispatch({ type: 'descriptionStatus' })}
              className='border border-pink-400 rounded-lg w-[8rem] p-3 text-pink-500 my-1'
            >
              Change
            </button>
          ) : (
            <div className='flex items-end flex-col'>
              <button
                onClick={handleClick}
                className='border border-pink-400 rounded-lg w-[6.5rem] text-pink-500 mb-2'
              >
                Save
              </button>
              <button
                onClick={() => dispatch({ type: 'descriptionStatus' })}
                className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className='flex items-center border-t p-3'>
          <div className='py-3 p-2'>
            <label htmlFor='startDate' className='text-sm text-gray-500'>
              Start date
            </label>
            <input
              type='date'
              name='startDate'
              id='startDate'
              disabled={values.status.startDate}
              value={values.task.startDate}
              onChange={handleChange}
              className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
            />
          </div>
          {values.status.startDate ? (
            <button
              onClick={() => dispatch({ type: 'startDateStatus' })}
              className='border border-pink-400 rounded-lg w-[8rem] p-3 text-pink-500 my-1'
            >
              Change
            </button>
          ) : (
            <div className='flex items-end flex-col'>
              <button
                onClick={handleClick}
                className='border border-pink-400 rounded-lg w-[6.5rem] text-pink-500 mb-2'
              >
                Save
              </button>
              <button
                onClick={() => dispatch({ type: 'startDateStatus' })}
                className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className='flex items-center border-t p-3'>
          <div className='py-3 p-2'>
            <label htmlFor='endDate' className='text-sm text-gray-500'>
              End date
            </label>
            <input
              type='date'
              name='endDate'
              id='endDate'
              disabled={values.status.endDate}
              value={values.task.endDate || ''}
              onChange={handleChange}
              className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
            />
          </div>
          {values.status.endDate ? (
            <button
              onClick={() => dispatch({ type: 'endDateStatus' })}
              className='border border-pink-400 rounded-lg w-[8rem] p-3 text-pink-500 my-1'
            >
              Change
            </button>
          ) : (
            <div className='flex items-end flex-col'>
              <button
                onClick={handleClick}
                className='border border-pink-400 rounded-lg w-[6.5rem] text-pink-500 mb-2'
              >
                Save
              </button>
              <button
                onClick={() => dispatch({ type: 'endDateStatus' })}
                className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export async function getServerSideProps(context) {
  const URI = process.env.API_URL;
  const { id } = context.params;
  const res = await fetch(`${URI}/tasks/${id}`);
  const data = await res.json();
  return {
    props: {
      task: data,
    },
  };
}
