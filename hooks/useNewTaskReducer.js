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
  title: '',
  description: '',
  startDate: '',
  endDate: null,
  personId: 'none',
  error: {
    title: false,
    description: false,
    startDate: false,
    personId: false,
  },
};

export default function useNewTaskReducer() {
  return useReducer(formReducer, initialState);
}
