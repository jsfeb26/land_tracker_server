import {
  CREATING_ORGANIZATION,
  CREATED_ORGANIZATION,
  FETCHING_USER_ORGS,
  FETCH_USER_ORGS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CREATING_ORGANIZATION:
      return { creating: true };
    case CREATED_ORGANIZATION:
      return { creating: false, created: true };
    case FETCHING_USER_ORGS:
      return { fetchingUserOrgs: true };
    case FETCH_USER_ORGS:
      return { fetchingUserOrgs: false, userOrgs: action.payload };
    default:
      return state;
  }
}
