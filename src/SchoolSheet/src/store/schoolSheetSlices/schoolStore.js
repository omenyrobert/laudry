import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStreams = createAsyncThunk("/schoolSheet/streams", async () => {
	const streams = await axiosInstance.get("/streams");
	const { data } = streams;
	const { status, payload } = data;
	if (status) return payload;
});

export const getSections = createAsyncThunk("/schoolSheet/sections", async () => {
	const sections = await axiosInstance.get("/sections");
	const { data } = sections;
	const { status, payload } = data;
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

export const getStudents = createAsyncThunk("/schoolSheet/students", async () => {
	const students = await axiosInstance.get("/students");
	const { data } = students;
	const { status, payload } = data;
	if (status) return payload;
});
export const getExamTypes = createAsyncThunk('schoolSheet/examTypes', async () => {
	const examTypes = await axiosInstance.get('/exam-types');
	const { data } = examTypes;
	const { status, payload } = data;
	if (status) return payload;
});

export const getHouses = createAsyncThunk("/schoolSheet/houses", async () => {
	const houses = await axiosInstance.get("/houses");
	const { data } = houses;
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

export const getStudentTypes = createAsyncThunk("/schoolSheet/studentTypes", async () => {
	const studentTypes = await axiosInstance.get("/student-types");
	const { data } = studentTypes;
	const { status, payload } = data;
	if (status) return payload;
});

export const getFeesStructure = createAsyncThunk("/schoolSheet/feesStructure", async () => {
	const feesStructure = await axiosInstance.get("/fees");
	const { data } = feesStructure;
	const { status, payload } = data;
	if (status) return payload;
});

export const getGrades = createAsyncThunk("/schoolSheet/grades", async () => {
	const grades = await axiosInstance.get("/grades");
	const { data } = grades;
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
		students: [],
		houses: [],
		studentTypes: [],
		fees: [],
		examTypes: [],
		assessments: [],
		grades: [],
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
		[getStudents.fulfilled]: (state, action) => {
			state.students = action.payload;
		},
		[getHouses.fulfilled]: (state, action) => {
			state.houses = action.payload;
		},
		[getStudentTypes.fulfilled]: (state, action) => {
			state.studentTypes = action.payload;
		},
		[getFeesStructure.fulfilled]: (state, action) => {
			state.fees = action.payload;
		},
		[getExamTypes.fulfilled]: (state, action) => {
			state.examTypes = action.payload;
		},
		[getAssessments.fulfilled]: (state, action) => {
			state.assessments = action.payload;
		},
		[getGrades.fulfilled]: (state, action) => {
			state.grades = action.payload;
		},
	},
});

export default schoolSheetSlices.reducer;
