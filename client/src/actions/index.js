import axios from 'axios';
import {
  FETCH_USER,
  CREATING_ORGANIZATION,
  CREATED_ORGANIZATION,
  FETCHING_USER_ORGS,
  FETCH_USER_ORGS,
  FETCHING_ORG_PARCELS,
  FETCH_ORG_PARCELS,
  SENDING_LETTER,
  SENT_LETTER
} from './types';

// redux-thunk catches any functions being returned from action creators
// it then gives us access to the dispatch function
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const onFileUpload = data => async dispatch => {
  const res = await axios.post('/api/parcels', data);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createNewOrganization = data => async dispatch => {
  dispatch({ type: CREATING_ORGANIZATION });
  await axios.post('/api/organization', data);
  dispatch({ type: CREATED_ORGANIZATION });
};

export const fetchUserOrgs = () => async dispatch => {
  dispatch({ type: FETCHING_USER_ORGS });
  const res = await axios.get('/api/user_organizations');
  dispatch({ type: FETCH_USER_ORGS, payload: res.data });
};

export const fetchOrgParcels = orgId => async dispatch => {
  dispatch({ type: FETCHING_ORG_PARCELS });
  const res = await axios.get('/api/parcels', { params: { orgId } });
  dispatch({ type: FETCH_ORG_PARCELS, payload: res.data });
};

export const sendLetter = ({ id, orgId }) => async dispatch => {
  dispatch({ type: SENDING_LETTER, payload: { id } });

  try {
    const res = await axios.put('/api/parcels/send/offer', { id, orgId });
    dispatch({ type: SENT_LETTER, payload: { id, data: res.data } });
  } catch (e) {
    dispatch({ type: SENT_LETTER, payload: { id, data: e.response.data } });
    // TODO: handle all error codes from Lob https://lob.com/docs/node#errors
  }
};
