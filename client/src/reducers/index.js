import { combineReducers } from "redux";
import authReducer from "./authReducer";
import orgReducer from "./orgReducer";

export default combineReducers({
  auth: authReducer,
  org: orgReducer
});
