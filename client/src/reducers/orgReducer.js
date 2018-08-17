import {
  CREATING_ORGANIZATION,
  CREATED_ORGANIZATION,
  FETCHING_USER_ORGS,
  FETCH_USER_ORGS,
  FETCHING_ORG_PARCELS,
  FETCH_ORG_PARCELS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CREATING_ORGANIZATION:
      return { ...state, creating: true };
    case CREATED_ORGANIZATION:
      return { ...state, creating: false, created: true };
    case FETCHING_USER_ORGS:
      return { ...state, fetchingUserOrgs: true };
    case FETCH_USER_ORGS:
      return { ...state, fetchingUserOrgs: false, userOrgs: action.payload };
    case FETCH_ORG_PARCELS:
      return { ...state, orgParcels: action.payload };
    default:
      return state;
  }
}
