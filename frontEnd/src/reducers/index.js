import { combineReducers } from "redux";

import slotMachineReducer from "./slotMachineReducer";
import countrysReducer from "./countrysReducer";
import dataBaseReducer from "./databaseReducer";

const allReducers = combineReducers({
  slotMachineReducer,
  countrysReducer,
  dataBaseReducer,
});

export default allReducers;
