import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import orgReducer from "./orgReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  createOrg: orgReducer
});
