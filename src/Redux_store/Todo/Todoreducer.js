import * as types from "./Todoaction.type";
const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
};

export const Todoreducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_TASK_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.GET_TASK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasks: payload,
      };
    }
    case types.GET_TASK_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    default: {
      return state;
    }
  }
};
