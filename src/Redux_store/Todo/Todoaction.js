import * as types from "./Todoaction.type";
import axios from "axios";

// GET_TASK_REQUEST

export const getTaskData = () => (dispatch) => {
  dispatch({ type: types.GET_TASK_REQUEST });

  return axios
    .get("http://localhost:5000/tasks")
    .then((response) => {
      dispatch({ type: types.GET_TASK_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: types.GET_TASK_FAILURE, payload: error });
    });
};

export const updateTask = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });

  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((response) => {
      dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: types.UPDATE_TASK_FAILURE, payload: error });
    });
};

export const addSubTask = (id, payload) => (dispatch) => {
  // her epayload is whole subtask array
  dispatch({ type: types.ADD_SUBTASK_REQUEST });

  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((response) => {
      dispatch({ type: types.ADD_SUBTASK_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: types.ADD_SUBTASK_FAILURE, payload: error });
    });
};

export const deleteSubTask = (id, payload) => (dispatch) => {
  // her epayload is whole subtask array
  dispatch({ type: types.DELETE_SUBTASK_REQUEST });

  return axios
    .patch(`http://localhost:5000/tasks/${id}`, payload)
    .then((response) => {
      dispatch({ type: types.DELETE_SUBTASK_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: types.DELETE_SUBTASK_FAILURE, payload: error });
    });
};

export const addTask = (data) => (dispatch) => {
  dispatch({ type: types.ADD_TASK_REQUEST });

  return axios
    .post("http://localhost:5000/tasks", data)
    .then((response) => {
      dispatch({ type: types.ADD_TASK_SUCCESS, payload: response.data });
      return types.ADD_TASK_SUCCESS;
    })
    .catch((error) => {
      dispatch({ type: types.ADD_TASK_FAILURE, payload: error });
      return types.ADD_TASK_FAILURE;
    });
};
