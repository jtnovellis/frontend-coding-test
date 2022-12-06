import { useReducer } from 'react';

function personEditReducer(state, action) {
  switch (action.type) {
    case 'changeOption':
      const { name, value } = action.payload;
      return {
        ...state,
        person: {
          ...state.person,
          [name]: value,
        },
      };
    case 'clear':
      return state;
    case 'pictureStatus':
      return {
        ...state,
        status: {
          ...state.status,
          picture: !state.status.picture,
        },
      };
    case 'nameStatus':
      return {
        ...state,
        status: {
          ...state.status,
          fullName: !state.status.fullName,
        },
      };
    case 'nickStatus':
      return {
        ...state,
        status: {
          ...state.status,
          nickname: !state.status.nickname,
        },
      };
    case 'ageStatus':
      return {
        ...state,
        status: {
          ...state.status,
          age: !state.status.age,
        },
      };
    case 'occupationStatus':
      return {
        ...state,
        status: {
          ...state.status,
          occupation: !state.status.occupation,
        },
      };
    case 'genderStatus':
      return {
        ...state,
        status: {
          ...state.status,
          occupation: !state.status.occupation,
        },
      };
    case 'defaultStatus':
      return {
        ...state,
        status: {
          picture: true,
          fullName: true,
          nickname: true,
          age: true,
          occupation: true,
          gender: true,
        },
      };
    case 'error':
      return {
        ...state,
        error: true,
      };
  }
}

export default function usePersonFormReducer(initialvalues) {
  const initialState = {
    status: {
      picture: true,
      fullName: true,
      nickname: true,
      age: true,
      occupation: true,
      gender: true,
    },
    person: {
      picture: initialvalues.picture,
      fullName: initialvalues.fullName,
      nickname: initialvalues.nickname,
      age: initialvalues.age,
      occupation: initialvalues.occupation,
      gender: initialvalues.gender,
    },
    error: false,
  };
  return useReducer(personEditReducer, initialState);
}
