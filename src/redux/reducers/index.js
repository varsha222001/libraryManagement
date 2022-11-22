import { bookReducer } from "./bookReducers";
import { combineReducers } from "redux";

export const reducers = combineReducers({
    books:bookReducer
})
