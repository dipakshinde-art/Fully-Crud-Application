import { saveLocalData, getLocalData } from "../../Util/LocalStorage";
import * as types from "./Authaction.type";

const initialState = {
  isAuth: getLocalData("token") ? true : false,
  token: getLocalData("token") || "",
  isLoading: false,
  isError: false,
  data: {
    name: "",
    email: "",
    username: "",
  },
};

export const Authreducer = (state = initialState, action) => {
  const { type, payload } = action;

  /* console.log("reducer auth",payload);*/

  switch (type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.LOGIN_SUCCESS: {
      saveLocalData("token", payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
      };
    }

    case types.REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case types.REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.LOGGED_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.LOGGED_USER_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
          name: payload.name,
          email: payload.email,
          username:payload.username,
        },
      };
    }
    case types.LOGGED_USER_INFO_FAILURE: {
      return {
        ...state,
        isError: true,
      };
    }

    case types.USER_SIGNOUT_SUCCESS: {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return {
        ...state,
        isAuth: false,
        token: "",
        data:{
          name: " ",
          email: " ",
          username: " ",
        }
      };
    }
    default: {
      return state;
    }
  }
};
