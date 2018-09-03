import { SENDING_LETTER, SENT_LETTER, FETCH_ORG_PARCELS } from "../actions/types";
import get from "lodash.get";

export default function(state = { orgParcels: [], sendingParcels: {} }, action) {
  const id = get(action, "payload.id");

  switch (action.type) {
    case FETCH_ORG_PARCELS:
      return { ...state, ...{ orgParcels: action.payload } };

    case SENDING_LETTER:
      return {
        ...state,
        ...{ ...state.sendingParcels, sendingParcels: { [id]: true } }
      };

    case SENT_LETTER:
      const orgParcels = state.orgParcels.map(parcel => {
        if (parcel._id !== id) {
          return parcel;
        }

        return {
          ...parcel,
          ...action.payload.data
        };
      });

      return {
        ...state,
        ...{ orgParcels },
        ...{ ...state.sendingParcels, sendingParcels: { [id]: false } }
      };

    default:
      return state;
  }
}
