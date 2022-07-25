import * as types from "./Authaction.type";
import axios from "axios";

export const registerUser = (payload) => (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  return axios
    .post("https://masai-api-mocker.herokuapp.com/auth/register", payload)
    .then((response) => {
      dispatch({ type: types.REGISTER_SUCCESS, payload: response.data });
      return types.REGISTER_SUCCESS;
    })
    .catch((err) => {
      dispatch({ type: types.REGISTER_FAILURE, err });
      return types.REGISTER_FAILURE;
    });
};

export const loginUser = (params) => (dispatch) => {
  //console.log("login user auth",params);
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("https://masai-api-mocker.herokuapp.com/auth/login", params)
    .then((res) => {
      /*console.log("login user auth",res.data);*/
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.token });
      return types.LOGIN_SUCCESS;
    })
    .catch((err) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: err });
      return types.LOGIN_FAILURE;
    });
};

export const logoutUser = (payload) => (dispatch) => {
  dispatch({ type: types.USER_SIGNOUT_REQUEST });

  dispatch({ type: types.USER_SIGNOUT_SUCCESS, payload });

  dispatch({ type: types.USER_SIGNOUT_REQUEST });
};

export const loginUserInformation = (params, token) => (dispatch) => {
  dispatch({ type: types.LOGGED_USER_INFO_REQUEST });
  return axios
    .get(`https://masai-api-mocker.herokuapp.com/user/${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("login user info", res.data);

      dispatch({
        type: types.LOGGED_USER_INFO_SUCCESS,
        payload: res.data,
      });
       return types.LOGGED_USER_INFO_SUCCESS;
    })
    .catch((err) => {
      dispatch({ type: types.LOGGED_USER_INFO_FAILURE, payload: err });
      // return types.LOGGED_USER_INFO_FAILURE;
    });
};
