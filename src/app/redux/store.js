import { configureStore } from "@reduxjs/toolkit";
import missionReducer from "./slice";

export const store = configureStore({
  reducer: {
    missionData: missionReducer,
  },
});
