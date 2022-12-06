import { useRouter } from 'next/router';
import useRegisterReducer from '../../hooks/useRegisterReducer';

export default function NewUserPage() {
  const [values, dispatch] = useRegisterReducer();
  const URI = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    validator();
    if (!picture && !fullName && !nickname && !age && !occupation && !gender) {
      const data = {
        fullName: values.fullName,
        age: values.age,
        occupation: values.occupation,
        nickname: values.nickname,
        gender: values.gender,
        picture: values.picture,
      };
      try {
        const res = await fetch(`${URI}/people`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        });
        const user = await res.json();
        router.push(`/profile/${user.id}`);
      } catch {
        dispatch({ type: 'requestError' });
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: 'changeOption', payload: { name, value } });
    const { picture, fullName, nickname, age, occupation, gender } =
      values.error;
    if (picture || fullName || nickname || age || occupation || gender) {
      validator();
    }
  }

  function validator() {
    if (values.picture === '') {
      dispatch({ type: 'error', payload: { name: 'picture' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'picture' } });
    }

    if (values.fullName === '') {
      dispatch({ type: 'error', payload: { name: 'fullName' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'fullName' } });
    }

    if (values.nickname === '') {
      dispatch({ type: 'error', payload: { name: 'nickname' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'nickname' } });
    }

    if (values.age === null) {
      dispatch({ type: 'error', payload: { name: 'age' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'age' } });
    }

    if (values.gender === '') {
      dispatch({ type: 'error', payload: { name: 'gender' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'gender' } });
    }

    if (values.occupation === '') {
      dispatch({ type: 'error', payload: { name: 'occupation' } });
    } else {
      dispatch({ type: 'resetError', payload: { name: 'occupation' } });
    }
  }
  return (
    <section className='p-4'>
      <h1 className='text-3xl text-center font-bold my-3 text-pink-500'>
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center px-4 md:w-[30rem] mx-auto'
      >
        <label htmlFor='picture' className='text-sm text-gray-500'>
          Avatar
        </label>
        <input
          value={values.picture}
          onChange={handleChange}
          type='text'
          name='picture'
          id='picture'
          placeholder='https://domain.png'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.picture && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='fullName' className='text-sm text-gray-500'>
          Full name
        </label>
        <input
          value={values.fullName}
          onChange={handleChange}
          type='text'
          name='fullName'
          id='fullName'
          placeholder='john Doe'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.fullName && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='nickname' className='text-sm text-gray-500'>
          Nickname
        </label>
        <input
          value={values.nickname}
          onChange={handleChange}
          type='text'
          name='nickname'
          id='nickname'
          placeholder='Johnny'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.nickname && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='age' className='text-sm text-gray-500'>
          Age
        </label>
        <input
          value={values.age}
          onChange={handleChange}
          type='number'
          name='age'
          id='age'
          placeholder='20'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.age && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='occupation' className='text-sm text-gray-500'>
          Occupation:
        </label>
        <input
          value={values.occupation}
          onChange={handleChange}
          type='text'
          name='occupation'
          id='occupation'
          placeholder='Sofware Developer'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.occupation && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <label htmlFor='gender' className='text-sm text-gray-500'>
          Gender:
        </label>
        <input
          value={values.gender}
          onChange={handleChange}
          type='text'
          name='gender'
          id='gender'
          placeholder='Female, Male or your preference'
          className='focus:outline-none border rounded-lg w-full mb-3 bg-gray-200 p-2'
        />
        {values.error.gender && (
          <p className='text-red-500 text-sm'>This field is not filled</p>
        )}
        <button className='border border-pink-400 p-1 py-2 rounded-lg w-full text-pink-500 my-1'>
          Send
        </button>
      </form>
    </section>
  );
}
