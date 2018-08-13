import axios from "axios";
import { FETCH_USER, CREATING_ORGANIZATION, CREATED_ORGANIZATION } from "./types";

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

export const onFileUpload = data => async dispatch => {
  const res = await axios.post("/api/parcels", data);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createNewOrganization = data => async dispatch => {
  dispatch({ type: CREATING_ORGANIZATION });
  // const res = await axios.post("/api/organization", data);
  setTimeout(() => {
    dispatch({ type: CREATED_ORGANIZATION });
  }, 5000);
};
