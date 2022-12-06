import { IconCircle, IconCircleCheck } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ItemList({ task }) {
  const [taskToRender, setTaskToRender] = useState(task);
  const [error, setError] = useState(false);
  const router = useRouter();

  const URI = process.env.NEXT_PUBLIC_API_URL;

  async function handleClick() {
    try {
      const data = {
        id: taskToRender.id,
        title: taskToRender.title,
        description: taskToRender.description,
        completed: !taskToRender.completed,
        startDate: taskToRender.startDate,
        endDate: taskToRender.endDate,
        personId: taskToRender.personId,
      };
      const res = await fetch(`${URI}/tasks/${taskToRender.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const newTask = await res.json();
      setTaskToRender((prev) => ({
        ...prev,
        completed: newTask.completed,
      }));
    } catch {
      setError(true);
    }
  }

  if (error)
    return (
      <p>
        Ups... An error has ocurred{' '}
        <Link
          className='text-pink-500 underline'
          href={`/profile/${taskToRender.personId}`}
        >
          Go to user profile
        </Link>
      </p>
    );

  return (
    <div className='border rounded-lg p-2 my-4'>
      <div className='flex justify-between'>
        <p
          className={
            taskToRender.completed
              ? 'font-bold text-lg line-through text-gray-500'
              : 'font-bold text-lg'
          }
        >
          {taskToRender.title}
        </p>
        <div>
          <div className='flex justify-between items-center'>
            <p className='text-md mr-2'>
              <strong>Status:</strong>{' '}
              {taskToRender.completed ? 'Done' : 'To Do'}
            </p>
            <button onClick={handleClick}>
              {taskToRender.completed ? (
                <IconCircleCheck size={20} color='#15803d' />
              ) : (
                <IconCircle size={20} color='#aeaeae' />
              )}
            </button>
          </div>
          <button
            onClick={() => router.push(`/tasks/${taskToRender.id}/edit`)}
            className='border border-pink-400 rounded-lg w-full text-pink-500 my-1'
          >
            Edit task
          </button>
        </div>
      </div>
      <div className='py-3'>
        <p className=''>{taskToRender.description}</p>
      </div>
    </div>
  );
}
