import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStreams = createAsyncThunk("/schoolSheet/streams", async () => {
	const streams = await axiosInstance.get("/streams");
	const { data } = streams;
	const { status, payload } = data;
	if (status) return payload;
});

export const schoolSheetSlices = createSlice({
	name: "SchoolSheetSlices",
	initialState: {
		streams: [],
	},
	extraReducers: {
		[getStreams.fulfilled]: (state, action) => {
			state.streams = action.payload;
		},
	},
});

export default schoolSheetSlices.reducer;
