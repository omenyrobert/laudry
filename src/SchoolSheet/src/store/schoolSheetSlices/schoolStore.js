import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStreams = createAsyncThunk("/schoolSheet/streams", async () => {
	const streams = await axiosInstance.get("/streams");
	const { data } = streams;
	const { status, payload } = data;
	if (status) return payload;
});

export const getStaffTypes = createAsyncThunk('schoolSheet/staffTypes', async () => {
	const staffTypes = await axiosInstance.get('/staffTypes');
	const { data } = staffTypes;
	const { status, payload } = data;
	if (status) return payload;
});

export const getStaffMembers = createAsyncThunk('schoolSheet/staffMembers', async () => {
	const staffMembers = await axiosInstance.get('/staff');
	const { data } = staffMembers;
	const { status, payload } = data;
	if (status) return payload;
});

export const schoolSheetSlices = createSlice({
	name: "SchoolSheetSlices",
	initialState: {
		streams: [],
		staffMembers: [],
		staffTypes: [],
	},
	extraReducers: {
		[getStreams.fulfilled]: (state, action) => {
			state.streams = action.payload;
		},
		[getStaffTypes.fulfilled]: (state, action) => {
			state.staffTypes = action.payload;
		},
		[getStaffMembers.fulfilled]: (state, action) => {
			state.staffMembers = action.payload;
		}
	},
});

export default schoolSheetSlices.reducer;
