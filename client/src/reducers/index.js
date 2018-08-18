import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import orgReducer from "./orgReducer";
import parcelReducer from "./parcelReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  org: orgReducer,
  parcel: parcelReducer
});
