import axios from "axios";
import { API } from "../API";
import {
  ADD_EVENT,
  EVENT_ERROR,
  EVENT_LOADING,
  EVENT_SUCCESS,
} from "./Game.type";

export const getEventsFunc =
  (page = 1, eventName, q) =>
  async (dispatch) => {
    dispatch({ type: EVENT_LOADING });
    try {
      let res = await axios.get(
        `${API}/events?page=${page}&limit=10&name=${eventName}&q=${q}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (res.data.status === "NO") {
        dispatch({ type: EVENT_SUCCESS, payload: [] });
      } else {
        dispatch({ type: EVENT_SUCCESS, payload: res.data });
      }
      // console.log(res.data)
      dispatch({ type: EVENT_SUCCESS, payload: res.data });
    } catch (e) {
      dispatch({ type: EVENT_ERROR, payload: e.message });
    }
  };

export const addEventFunc = (message) => async (dispatch) => {
  dispatch({ type: EVENT_LOADING });
  try {
    let res = await axios.post(`${API}/events`, message, {
      headers: { token: localStorage.getItem("token") },
    });
    if (res.data.status === "NO") {
      alert(`${res.data.msg}`);
      return;
    } else {
      alert(`${res.data.msg}`);
    }
    dispatch({ type: ADD_EVENT, payload: res.data.event });
  } catch (e) {
    dispatch({ type: EVENT_ERROR, payload: e.message });
  }
};
