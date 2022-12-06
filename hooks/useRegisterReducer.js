import { useReducer } from 'react';

function formReducer(state, action) {
  const { name, value } = action.payload;
  switch (action.type) {
    case 'changeOption':
      return {
        ...state,
        [name]: value,
      };
    case 'error':
      return {
        ...state,
        error: {
          ...state.error,
          [name]: true,
        },
      };
    case 'resetError':
      return {
        ...state,
        error: {
          ...state.error,
          [name]: false,
        },
      };
    default:
      return state;
  }
}

const initialState = {
  picture: '',
  fullName: '',
  nickname: '',
  age: null,
  occupation: '',
  gender: '',
  error: {
    picture: false,
    fullName: false,
    nickname: false,
    age: false,
    occupation: false,
    gender: false,
  },
};

export default function useRegisterReducer() {
  return useReducer(formReducer, initialState);
}
