import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  missionApiData: [],
};

export const fetchMissionApi = createAsyncThunk("fetchMissionApi", async () => {
  const data = await fetch("https://api.spacexdata.com/v3/launches");
  const newData = await data.json();

  const updatedData = newData.sort((a, b) => {
    const aDate = new Date(a.launch_date_local.split("T", 1));
    const bDate = new Date(b.launch_date_local.split("T", 1));

    return bDate - aDate;
  });
  return updatedData;
});

const Slice = createSlice({
  name: "missionApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMissionApi.fulfilled, (state, action) => {
      state.missionApiData = action.payload;
    });
  },
});

export default Slice.reducer;
