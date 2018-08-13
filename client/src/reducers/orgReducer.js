import { CREATING_ORGANIZATION, CREATED_ORGANIZATION } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CREATING_ORGANIZATION:
      return { creating: true };
    case CREATED_ORGANIZATION:
      return { creating: false, created: true };
    default:
      return state;
  }
}
