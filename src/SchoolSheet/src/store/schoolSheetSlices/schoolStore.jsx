import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const data_fetch = async (url) => {
  const response = await axiosInstance.get(url);
  const { data } = response;
  const { status, payload } = data;
  if (status) return payload;
};

export const getStreams = createAsyncThunk("/schoolSheet/streams", async () => {
  return await data_fetch("/streams");
});

export const getSections = createAsyncThunk(
  "/schoolSheet/sections",
  async () => {
    return await data_fetch("/sections");
  }
);

export const getStaffTypes = createAsyncThunk(
  "schoolSheet/staffTypes",
  async () => {
    return await data_fetch("/staffTypes");
  }
);

export const getStaffMembers = createAsyncThunk(
  "schoolSheet/staffMembers",
  async () => {
    return await data_fetch("/staff");
  }
);

export const getClasses = createAsyncThunk("schoolSheet/classes", async () => {
  return await data_fetch("/class");
});

export const getSubjects = createAsyncThunk(
  "/schoolSheet/subjects",
  async () => {
    return await data_fetch("/subjects");
  }
);

export const getStudents = createAsyncThunk(
  "/schoolSheet/students",
  async ({ page = 0, count = 20 }) => {
    return await data_fetch(`/students?page=${page}&count=${count}`);
  }
);
export const getExamTypes = createAsyncThunk(
  "schoolSheet/examTypes",
  async () => {
    return await data_fetch("/exam-types");
  }
);

export const getHouses = createAsyncThunk("/schoolSheet/houses", async () => {
  return await data_fetch("/houses");
});

export const getAssessments = createAsyncThunk(
  "/schoolSheet/assessments",
  async () => {
    return await data_fetch("/assessments");
  }
);

export const getStudentTypes = createAsyncThunk(
  "/schoolSheet/studentTypes",
  async () => {
    return await data_fetch("/student-types");
  }
);

export const getFeesStructure = createAsyncThunk(
  "/schoolSheet/feesStructure",
  async () => {
    return await data_fetch("/fees");
  }
);

export const getGrades = createAsyncThunk("/schoolSheet/grades", async () => {
  return await data_fetch("/grades");
});

export const getTerms = createAsyncThunk("/schoolSheet/terms", async () => {
  return await data_fetch("/terms");
});

export const getSchools = createAsyncThunk("/schoolSheet/schools", async () => {
  return await data_fetch("/schools");
});

export const getAccounts = createAsyncThunk(
  "/schoolSheet/accounts",
  async () => {
    return await data_fetch("/accounts");
  }
);

export const getJournals = createAsyncThunk(
  "/schoolSheet/journals",
  async () => {
    return await data_fetch("/journals");
  }
);

export const getSuppliers = createAsyncThunk(
  "/schoolSheet/suppliers",
  async () => {
    return await data_fetch("/suppliers");
  }
);

export const getDivisions = createAsyncThunk(
  "/schoolSheet/divisions",
  async () => {
    return await data_fetch("/divisions");
  }
);

export const getTransactionsByAccountId = createAsyncThunk(
  "/schoolSheet/transactionsByAccountId",
  async (accountId) => {
    return await data_fetch(`/transactions/accounts/${accountId}`);
  }
);

export const getTransactions = createAsyncThunk(
  "/schoolSheet/transactions",
  async () => {
    return await data_fetch("/transactions");
  }
);

export const getAssessmentsByTerm = createAsyncThunk(
  "/schoolSheet/assessmentsByTerm",
  async (termId) => {
    return await data_fetch(`/assessments/term/${termId}`);
  }
);

export const getReports = createAsyncThunk("/schoolSheet/reports", async () => {
  return await data_fetch("/reports");
});

export const getStockTypes = createAsyncThunk(
  "schoolSheet/stockTypes",
  async () => {
    return await data_fetch("/stockTypes");
  }
);

export const getStockLevels = createAsyncThunk(
  "schoolSheet/stockLevels",
  async () => {
    return await data_fetch("/stock-levels");
  }
);

export const getReductions = createAsyncThunk(
  "/schoolSheet/reductions",
  async () => {
    return await data_fetch("/reductions");
  }
);

export const getToken = createAsyncThunk("/schoolSheet/token", async () => {
  return await data_fetch("/system");
});

export const getStudentCount = createAsyncThunk(
  "/schoolSheet/studentCount",
  async () => {
    return await data_fetch("/students/studentCount/count");
  }
);

export const getSearchStudents = createAsyncThunk(
  "/schoolSheet/searchStudent",
  async (searchData) => {
    let url =
      "/search/students?page=" +
      searchData?.searchPage +
      "&keyword=" +
      searchData?.searchInput +
      "&count=" +
      searchData?.count;

    return await data_fetch(url);
  }
);

export const getClassLevels = createAsyncThunk(
  "/schoolSheet/classLevels",
  async () => {
    return await data_fetch("/class-levels");
  }
);

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
    terms: [],
    schools: [],
    accounts: [],
    journals: [],
    suppliers: [],
    divisions: [],
    transactionsByAccountId: [],
    transactions: [],
    assessmentsByTerm: [],
    reports: [],
    stockTypes: [],
    stockLevels: [],
    reductions: [],
    searchStudents: [],
    token: null,
    studentsCount: null,
    classLevels: [],
    loading: {
      streams: false,
      staffMembers: false,
      staffTypes: false,
      classes: false,
      sections: false,
      subjects: false,
      students: false,
      houses: false,
      studentTypes: false,
      fees: false,
      examTypes: false,
      assessments: false,
      grades: false,
      terms: false,
      schools: false,
      accounts: false,
      journals: false,
      suppliers: false,
      divisions: false,
      transactionsByAccountId: false,
      transactions: false,
      assessmentsByTerm: false,
      reports: false,
      stockTypes: false,
      stockLevels: false,
      reductions: false,
      token: false,
      searchingStudents: false,
      studentsCount: false,
      classLevels: false,
    },
  },
  extraReducers: {
    [getStreams.pending]: (state) => {
      state.loading.streams = true;
    },
    [getStreams.fulfilled]: (state, action) => {
      state.loading.streams = false;
      state.streams = action.payload;
    },
    [getStreams.rejected]: (state) => {
      state.loading.streams = false;
    },
    [getSections.pending]: (state) => {
      state.loading.sections = true;
    },
    [getSections.fulfilled]: (state, action) => {
      state.loading.sections = false;
      state.sections = action.payload;
    },
    [getSections.rejected]: (state) => {
      state.loading.sections = false;
    },
    [getStaffTypes.pending]: (state) => {
      state.loading.staffTypes = true;
    },
    [getStaffTypes.fulfilled]: (state, action) => {
      state.loading.staffTypes = false;
      state.staffTypes = action.payload;
    },
    [getStaffTypes.rejected]: (state) => {
      state.loading.staffTypes = false;
    },
    [getStaffMembers.pending]: (state) => {
      state.loading.staffMembers = true;
    },
    [getStaffMembers.fulfilled]: (state, action) => {
      state.loading.staffMembers = false;
      state.staffMembers = action.payload;
    },
    [getStaffMembers.rejected]: (state) => {
      state.loading.staffMembers = false;
    },

    [getClasses.pending]: (state) => {
      state.loading.classes = true;
    },
    [getClasses.fulfilled]: (state, action) => {
      state.loading.classes = false;
      state.classes = action.payload;
    },
    [getClasses.rejected]: (state) => {
      state.loading.classes = false;
    },

    [getSubjects.pending]: (state) => {
      state.loading.subjects = true;
    },
    [getSubjects.fulfilled]: (state, action) => {
      state.loading.subjects = false;
      state.subjects = action.payload;
    },
    [getSubjects.rejected]: (state) => {
      state.loading.subjects = false;
    },

    [getStudents.pending]: (state) => {
      state.loading.students = true;
    },
    [getStudents.fulfilled]: (state, action) => {
      state.loading.students = false;
      state.students = action.payload;
    },
    [getStudents.rejected]: (state) => {
      state.loading.students = false;
    },

    [getHouses.pending]: (state) => {
      state.loading.houses = true;
    },
    [getHouses.fulfilled]: (state, action) => {
      state.loading.houses = false;
      state.houses = action.payload;
    },
    [getHouses.rejected]: (state) => {
      state.loading.houses = false;
    },

    [getStudentTypes.pending]: (state) => {
      state.loading.studentTypes = true;
    },
    [getStudentTypes.fulfilled]: (state, action) => {
      state.loading.studentTypes = false;
      state.studentTypes = action.payload;
    },
    [getStudentTypes.rejected]: (state) => {
      state.loading.studentTypes = false;
    },

    [getFeesStructure.pending]: (state) => {
      state.loading.fees = true;
    },
    [getFeesStructure.fulfilled]: (state, action) => {
      state.loading.fees = false;
      state.fees = action.payload;
    },
    [getFeesStructure.rejected]: (state) => {
      state.loading.fees = false;
    },

    [getExamTypes.pending]: (state) => {
      state.loading.examTypes = true;
    },
    [getExamTypes.fulfilled]: (state, action) => {
      state.loading.examTypes = false;
      state.examTypes = action.payload;
    },
    [getExamTypes.rejected]: (state) => {
      state.loading.examTypes = false;
    },

    [getAssessments.pending]: (state) => {
      state.loading.assessments = true;
    },
    [getAssessments.fulfilled]: (state, action) => {
      state.loading.assessments = false;
      state.assessments = action.payload;
    },
    [getAssessments.rejected]: (state) => {
      state.loading.assessments = false;
    },

    [getGrades.pending]: (state) => {
      state.loading.grades = true;
    },
    [getGrades.fulfilled]: (state, action) => {
      state.loading.grades = false;
      state.grades = action.payload;
    },
    [getGrades.rejected]: (state) => {
      state.loading.grades = false;
    },

    [getTerms.pending]: (state) => {
      state.loading.terms = true;
    },
    [getTerms.fulfilled]: (state, action) => {
      state.loading.terms = false;
      state.terms = action.payload;
    },
    [getTerms.rejected]: (state) => {
      state.loading.terms = false;
    },

    [getSchools.pending]: (state) => {
      state.loading.schools = true;
    },
    [getSchools.fulfilled]: (state, action) => {
      state.loading.schools = false;
      state.schools = action.payload;
    },
    [getSchools.rejected]: (state) => {
      state.loading.schools = false;
    },

    [getAccounts.pending]: (state) => {
      state.loading.accounts = true;
    },
    [getAccounts.fulfilled]: (state, action) => {
      state.loading.accounts = false;
      state.accounts = action.payload;
    },
    [getAccounts.rejected]: (state) => {
      state.loading.accounts = false;
    },

    [getJournals.pending]: (state) => {
      state.loading.journals = true;
    },
    [getJournals.fulfilled]: (state, action) => {
      state.loading.journals = false;
      state.journals = action.payload;
    },
    [getJournals.rejected]: (state) => {
      state.loading.journals = false;
    },

    [getSuppliers.pending]: (state) => {
      state.loading.suppliers = true;
    },
    [getSuppliers.fulfilled]: (state, action) => {
      state.loading.suppliers = false;
      state.suppliers = action.payload;
    },
    [getSuppliers.rejected]: (state) => {
      state.loading.suppliers = false;
    },
    [getDivisions.pending]: (state) => {
      state.loading.divisions = true;
    },
    [getDivisions.fulfilled]: (state, action) => {
      state.loading.divisions = false;
      state.divisions = action.payload;
    },
    [getDivisions.rejected]: (state) => {
      state.loading.divisions = false;
    },
    [getTransactionsByAccountId.pending]: (state) => {
      state.loading.transactionsByAccountId = true;
    },
    [getTransactionsByAccountId.fulfilled]: (state, action) => {
      state.loading.transactionsByAccountId = false;
      state.transactionsByAccountId = action.payload;
    },
    [getTransactionsByAccountId.rejected]: (state) => {
      state.loading.transactionsByAccountId = false;
    },
    [getTransactions.pending]: (state) => {
      state.loading.transactions = true;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.loading.transactions = false;
      state.transactions = action.payload;
    },
    [getTransactions.rejected]: (state) => {
      state.loading.transactions = false;
    },
    [getAssessmentsByTerm.pending]: (state) => {
      state.loading.assessmentsByTerm = true;
    },
    [getAssessmentsByTerm.fulfilled]: (state, action) => {
      state.loading.assessmentsByTerm = false;
      state.assessmentsByTerm = action.payload;
    },
    [getAssessmentsByTerm.rejected]: (state) => {
      state.loading.assessmentsByTerm = false;
    },
    [getReports.pending]: (state) => {
      state.loading.reports = true;
    },
    [getReports.fulfilled]: (state, action) => {
      state.loading.reports = false;
      state.reports = action.payload;
    },
    [getReports.rejected]: (state) => {
      state.loading.reports = false;
    },
    [getStockTypes.pending]: (state) => {
      state.loading.stockTypes = true;
    },
    [getStockTypes.fulfilled]: (state, action) => {
      state.loading.stockTypes = false;
      state.stockTypes = action.payload;
    },
    [getStockTypes.rejected]: (state) => {
      state.loading.stockTypes = false;
    },
    [getStockLevels.pending]: (state) => {
      state.loading.stockLevels = true;
    },
    [getStockLevels.fulfilled]: (state, action) => {
      state.loading.stockLevels = false;
      state.stockLevels = action.payload;
    },
    [getStockTypes.rejected]: (state) => {
      state.loading.stockLevels = false;
    },
    [getReductions.pending]: (state) => {
      state.loading.reductions = true;
    },
    [getReductions.fulfilled]: (state, action) => {
      state.loading.reductions = false;
      state.reductions = action.payload;
    },
    [getReductions.rejected]: (state) => {
      state.loading.reductions = false;
    },
    [getToken.pending]: (state) => {
      state.loading.token = true;
    },
    [getToken.fulfilled]: (state, action) => {
      state.loading.token = false;
      state.token = action.payload;
    },
    [getSearchStudents.rejected]: (state) => {
      state.loading.searchStudents = false;
    },
    [getSearchStudents.pending]: (state) => {
      state.loading.searchStudents = true;
    },
    [getSearchStudents.fulfilled]: (state, action) => {
      state.loading.searchStudents = false;
      state.searchingStudents = action.payload;
    },
    [getStudentCount.pending]: (state) => {
      state.loading.studentsCount = true;
    },
    [getStudentCount.fulfilled]: (state, action) => {
      state.loading.studentsCount = false;
      state.studentsCount = action.payload;
    },
    [getStudentCount.rejected]: (state) => {
      state.loading.studentsCount = false;
    },
    [getClassLevels.pending]: (state) => {
      state.loading.classLevels = true;
    },
    [getClassLevels.fulfilled]: (state, action) => {
      state.loading.classLevels = false;
      state.classLevels = action.payload;
    },
    [getClassLevels.rejected]: (state) => {
      state.loading.classLevels = false;
    },
  },
});

export default schoolSheetSlices.reducer;
