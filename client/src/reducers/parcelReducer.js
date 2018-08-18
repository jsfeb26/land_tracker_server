import { SENDING_LETTER, SENT_LETTER } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SENDING_LETTER:
      return { ...state, creating: true };
    case SENT_LETTER:
      return { ...state, creating: false, created: true };
    default:
      return state;
  }
}
