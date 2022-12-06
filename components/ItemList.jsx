import { IconCircle, IconCircleCheck } from '@tabler/icons';
import { useState } from 'react';

export default function ItemList({ task }) {
  const [taskToRender, setTaskToRender] = useState(task);
  const URI = process.env.NEXT_PUBLIC_API_URL;

  async function handleClick() {
    if (!taskToRender.completed) {
      try {
        const data = {
          id: taskToRender.id,
          title: taskToRender.title,
          description: taskToRender.description,
          completed: true,
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
      } catch {}
    }
  }
  return (
    <div className='border rounded-lg p-2 my-4'>
      <div className='flex justify-between'>
        <p className='font-bold text-lg'>{taskToRender.title}</p>
        <div className='flex justify-between items-center'>
          <p className='text-md mr-2'>
            <strong>Status:</strong> {taskToRender.completed ? 'Done' : 'To Do'}
          </p>
          <button onClick={handleClick}>
            {taskToRender.completed ? (
              <IconCircleCheck size={20} color='#15803d' />
            ) : (
              <IconCircle size={20} color='#aeaeae' />
            )}
          </button>
        </div>
      </div>
      <div className='py-3'>
        <p className=''>{taskToRender.description}</p>
      </div>
    </div>
  );
}
