import axios from "axios";
import {
  FETCH_USER,
  CREATING_ORGANIZATION,
  CREATED_ORGANIZATION,
  FETCHING_USER_ORGS,
  FETCH_USER_ORGS,
  FETCHING_ORG_PARCELS,
  FETCH_ORG_PARCELS
} from "./types";

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
  await axios.post("/api/organization", data);
  dispatch({ type: CREATED_ORGANIZATION });
};

export const fetchUserOrgs = () => async dispatch => {
  dispatch({ type: FETCHING_USER_ORGS });
  const res = await axios.get("/api/user_organizations");
  dispatch({ type: FETCH_USER_ORGS, payload: res.data });
};

export const fetchOrgParcels = orgId => async dispatch => {
  dispatch({ type: FETCHING_ORG_PARCELS });
  const res = await axios.get("/api/parcels", { params: { orgId } });
  dispatch({ type: FETCH_ORG_PARCELS, payload: res.data });
};
