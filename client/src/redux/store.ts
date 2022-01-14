import { combineReducers, createStore } from "redux";
import chatReducer from "./chatReducer";
import userReducer from "./userReducer";
const reducers=combineReducers({
  user:userReducer,
  chats:chatReducer
});
const store=createStore(reducers);
export default store;

export type RootState = ReturnType<typeof store.getState>