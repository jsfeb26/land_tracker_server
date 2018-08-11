import axios from "axios";
import { FETCH_USER } from "./types";

// redux-thunk catches any functions being returned from action creators
// it then gives us access to the dispatch function
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
