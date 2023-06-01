import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStreams = createAsyncThunk("/schoolSheet/streams", async () => {
	const streams = await axiosInstance.get("/streams");
	const { data } = streams;
	const { status, payload } = data;
	if (status) return payload;
});

export const getSections = createAsyncThunk("/schoolSheet/sections", async()=>{
	const sections = await axiosInstance.get("/sections");
	const {data} = sections;
	const {status, payload} = data;
	if (status) return payload;
})

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

export const getClasses = createAsyncThunk('schoolSheet/classes', async () => {
	const classes = await axiosInstance.get('/class');
	const { data } = classes;
	const { status, payload } = data;
	if (status) return payload
});

export const getSubjects = createAsyncThunk("/schoolSheet/subjects", async () => {
	const subjects = await axiosInstance.get("/subjects");
	const { data } = subjects;
	const { status, payload } = data;
	if (status) return payload;
});

export const getExamTypes = createAsyncThunk('schoolSheet/examTypes', async () => {
	const examTypes = await axiosInstance.get('/exam-types');
	const { data } = examTypes;
	const { status, payload } = data;
	if (status) return payload;
});

export const getAssessments = createAsyncThunk("/schoolSheet/assessments",
async () => {
	const assessments = await axiosInstance.get("/assessments");
	const { data } = assessments;
	const { status, payload } = data;
	if (status) return payload;
});

export const schoolSheetSlices = createSlice({
	name: "SchoolSheetSlices",
	initialState: {
		streams: [],
		staffMembers: [],
		staffTypes: [],
		classes: [],
		sections: [],
		subjects: [],
		examTypes: [],
		assessments: [],
	},
	extraReducers: {
		[getStreams.fulfilled]: (state, action) => {
			state.streams = action.payload;
		},
		[getSections.fulfilled]: (state, action) => {
          state.sections = action.payload;
		},
		[getStaffTypes.fulfilled]: (state, action) => {
			state.staffTypes = action.payload;
		},
		[getStaffMembers.fulfilled]: (state, action) => {
			state.staffMembers = action.payload;
		},
		[getClasses.fulfilled]: (state, action) => {
			state.classes = action.payload;
		},
		[getSubjects.fulfilled]: (state, action) => {
			state.subjects = action.payload;
		},
		[getExamTypes.fulfilled]: (state, action) => {
			state.examTypes = action.payload;
		},
		[getAssessments.fulfilled]: (state, action) => {
			state.assessments = action.payload;
		},
	},
});

export default schoolSheetSlices.reducer;
