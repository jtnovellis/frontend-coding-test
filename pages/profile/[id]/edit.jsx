import { IconChevronLeft } from '@tabler/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import usePersonFormReducer from '../../../hooks/usePersonFromReducer';

export default function EditPage({ person }) {
  const [newValues, dispatch] = usePersonFormReducer(person);
  const URI = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: 'changeOption', payload: { name, value } });
  }

  async function handleClick() {
    const data = {
      id: newValues.person.id,
      fullName: newValues.person.fullName,
      age: newValues.person.age,
      occupation: newValues.person.occupation,
      nickname: newValues.person.nickname,
      gender: newValues.person.gender,
      picture: newValues.person.picture,
    };
    try {
      await fetch(`${URI}/people/${person.id}`, {
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

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className='p-4'>
      <div className='flex justify-between px-1'>
        <h1 className='text-3xl text-center font-bold my-3 text-pink-500'>
          Settings
        </h1>
        <button
          onClick={() => router.push(`/profile/${person.id}`)}
          className='flex justify-between items-center text-gray-500'
        >
          <IconChevronLeft />
          <span>Go back</span>
        </button>
      </div>
      <form className='border rounded-lg' onSubmit={handleSubmit}>
        {newValues.status.picture ? (
          <div className='flex justify-between items-center p-3'>
            <Image
              src={newValues.person.picture}
              alt={`profile photo of ${newValues.person.fullName}`}
              width={60}
              height={60}
              className='rounded-full'
            />
            <button
              onClick={() => dispatch({ type: 'pictureStatus' })}
              className='border border-pink-400 rounded-lg w-[8rem] text-pink-500 my-1'
            >
              Change
            </button>
          </div>
        ) : (
          <div className='p-3'>
            <label htmlFor='picture' className='text-sm text-gray-500'>
              Link to your profile image
            </label>
            <input
              type='text'
              name='picture'
              id='picture'
              value={newValues.person.picture}
              onChange={handleChange}
              className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
            />
            <div className='flex justify-between p-1'>
              <button
                onClick={handleClick}
                className='border border-pink-400 p-1 rounded-lg w-[8rem] text-pink-500 my-1'
              >
                Save
              </button>
              <button
                onClick={() => dispatch({ type: 'pictureStatus' })}
                className='border border-gray-400 p-1 rounded-lg w-[8rem] text-gray-500 my-1'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div>
          <div className='flex items-center border-t p-3'>
            <div className='py-3 p-2'>
              <label htmlFor='fullName' className='text-sm text-gray-500'>
                Full Name
              </label>
              <input
                type='text'
                name='fullName'
                id='fullName'
                disabled={newValues.status.fullName}
                value={newValues.person.fullName}
                onChange={handleChange}
                className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
              />
            </div>
            {newValues.status.fullName ? (
              <button
                onClick={() => dispatch({ type: 'nameStatus' })}
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
                  onClick={() => dispatch({ type: 'nameStatus' })}
                  className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className='flex items-center border-t p-3'>
            <div className='py-3 p-2'>
              <label htmlFor='nickname' className='text-sm text-gray-500'>
                Nickname
              </label>
              <input
                type='text'
                name='nickname'
                id='nickname'
                disabled={newValues.status.nickname}
                value={newValues.person.nickname}
                onChange={handleChange}
                className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
              />
            </div>
            {newValues.status.nickname ? (
              <button
                onClick={() => dispatch({ type: 'nickStatus' })}
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
                  onClick={() => dispatch({ type: 'nickStatus' })}
                  className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className='flex items-center border-t p-3'>
            <div className='py-3 p-2'>
              <label htmlFor='age' className='text-sm text-gray-500'>
                Age
              </label>
              <input
                type='number'
                name='age'
                id='age'
                disabled={newValues.status.age}
                value={newValues.person.age}
                onChange={handleChange}
                className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
              />
            </div>
            {newValues.status.age ? (
              <button
                onClick={() => dispatch({ type: 'ageStatus' })}
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
                  onClick={() => dispatch({ type: 'ageStatus' })}
                  className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className='flex items-center border-t p-3'>
            <div className='py-3 p-2'>
              <label htmlFor='occupation' className='text-sm text-gray-500'>
                Occupation
              </label>
              <input
                type='text'
                name='occupation'
                id='occupation'
                disabled={newValues.status.occupation}
                value={newValues.person.occupation}
                onChange={handleChange}
                className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
              />
            </div>
            {newValues.status.occupation ? (
              <button
                onClick={() => dispatch({ type: 'occupationStatus' })}
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
                  onClick={() => dispatch({ type: 'occupationStatus' })}
                  className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className='flex items-center border-t p-3'>
            <div className='py-3 p-2'>
              <label htmlFor='gender' className='text-sm text-gray-500'>
                Gender
              </label>
              <input
                type='text'
                name='gender'
                id='gender'
                disabled={newValues.status.gender}
                value={newValues.person.gender}
                onChange={handleChange}
                className='focus:outline-none border rounded-lg w-full mb-2 bg-gray-200 p-2'
              />
            </div>
            {newValues.status.gender ? (
              <button
                onClick={() => dispatch({ type: 'genderStatus' })}
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
                  onClick={() => dispatch({ type: 'genderStatus' })}
                  className='border border-gray-400 rounded-lg w-[6.5rem] text-gray-500'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export async function getServerSideProps(context) {
  const URI = process.env.API_URL;
  const { id } = context.params;
  const resPeople = await fetch(`${URI}/people/${id}`);
  const dataPeople = await resPeople.json();
  return {
    props: {
      person: dataPeople,
    },
  };
}
