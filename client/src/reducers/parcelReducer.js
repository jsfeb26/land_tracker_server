import get from "lodash.get";

import { SENDING_LETTER, SENT_LETTER, FETCH_ORG_PARCELS } from "../actions/types";

export default function(state = { orgParcels: [], sendingParcels: {} }, action) {
  const id = get(action, "payload.id");

  switch (action.type) {
    case FETCH_ORG_PARCELS:
      const parcels = action.payload;
      parcels.sort((a, b) => {
        const aRef = parseInt(a.refNumber.split("-")[1], 10);
        const bRef = parseInt(b.refNumber.split("-")[1], 10);

        if (a.status === "Open" && b.status === "Open") {
          return aRef - bRef;
        }

        if (a.status === "Open") {
          return -1;
        }

        if (b.status === "Open") {
          return 1;
        }

        return aRef - bRef;
      });
      return { ...state, ...{ orgParcels: parcels } };

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
