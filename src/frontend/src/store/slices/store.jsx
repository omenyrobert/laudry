import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCartegories = createAsyncThunk("/autocount/cartegories", async () => {
	const cartegories = await axiosInstance.get("/categories");
	const { data } = cartegories;
	const { status, payload } = data;
	if (status) return payload;
});


export const getStock = createAsyncThunk("/autocount/stock", async (
	page = 1,
) => {
	const stock = await axiosInstance.get("/stock?page=" + page);
	const { data } = stock;
	const { status, payload } = data;
	if (status) return payload;
});


export const getSales = createAsyncThunk("/autocount/sales", async (
	page = 1,
) => {
	const sales = await axiosInstance.get("/sales?page=" + page);
	const { data } = sales;
	const { status, payload } = data;
	if (status) return payload;
});

export const getTodaySales = createAsyncThunk("/autocount/todaySales", async () => {
	const today = new Date().toISOString().slice(0, 10);
	const sales = await axiosInstance.get("/sales/by-date?date=" + today);
	const { data } = sales;
	const { status, payload } = data;
	if (status) return payload;
});


export const autoCountSlices = createSlice({
	name: "AutoCountStore",
	initialState: {
		cartegories: [],
		stock: [],
		sales: [],
		todaySales: [],
		loading: {
			cartegories: false,
			stock: false,
			sales: false,
			todaySales: false,
		},
	},
	extraReducers: {
		[getCartegories.pending]: (state) => {
			state.loading.cartegories = true;
		},
		[getCartegories.fulfilled]: (state, action) => {
			state.loading.cartegories = false;
			state.cartegories = action.payload;
		},
		[getCartegories.rejected]: (state) => {
			state.loading.cartegories = false;
		},
		[getStock.pending]: (state) => {
			state.loading.stock = true;
		},
		[getStock.fulfilled]: (state, action) => {
			state.loading.stock = false;
			state.stock = action.payload;
		},
		[getStock.rejected]: (state) => {
			state.loading.stock = false;
		},
		[getSales.pending]: (state) => {
			state.loading.sales = true;
		},
		[getSales.fulfilled]: (state, action) => {
			state.loading.sales = false;
			state.sales = action.payload;
		},
		[getSales.rejected]: (state) => {
			state.loading.sales = false;
		},
		[getTodaySales.pending]: (state) => {
			state.loading.todaySales = true;
		},
		[getTodaySales.fulfilled]: (state, action) => {
			state.loading.todaySales = false;
			state.todaySales = action.payload;
		},
		[getTodaySales.rejected]: (state) => {
			state.loading.todaySales = false;
		},
	},
});




export default autoCountSlices.reducer;
