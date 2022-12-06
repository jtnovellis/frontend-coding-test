import { useReducer } from 'react';

function taskEditReducer(state, action) {
  switch (action.type) {
    case 'changeOption':
      const { name, value } = action.payload;
      return {
        ...state,
        task: {
          ...state.task,
          [name]: value,
        },
      };
    case 'titleStatus':
      return {
        ...state,
        status: {
          ...state.status,
          title: !state.status.title,
        },
      };
    case 'descriptionStatus':
      return {
        ...state,
        status: {
          ...state.status,
          description: !state.status.description,
        },
      };
    case 'startDateStatus':
      return {
        ...state,
        status: {
          ...state.status,
          startDate: !state.status.startDate,
        },
      };
    case 'endDateStatus':
      return {
        ...state,
        status: {
          ...state.status,
          endDate: !state.status.endDate,
        },
      };
    case 'defaultStatus':
      return {
        ...state,
        status: {
          title: true,
          description: true,
          startDate: true,
          endDate: true,
        },
      };
    case 'error':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}

export default function useTaskFormReducer(initialvalues) {
  const initialState = {
    status: {
      title: true,
      description: true,
      startDate: true,
      endDate: true,
    },
    task: {
      title: initialvalues.title,
      description: initialvalues.description,
      completed: initialvalues.completed,
      startDate: initialvalues.startDate,
      endDate: initialvalues.endDate,
      personId: initialvalues.personId,
    },
    error: false,
  };
  return useReducer(taskEditReducer, initialState);
}
