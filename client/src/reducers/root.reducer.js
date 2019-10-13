import { combineReducers } from "redux";
import { users } from "./users.reducer";
import { authentication } from './authentication.reducer';

export default combineReducers({
    users,
    authentication
});
