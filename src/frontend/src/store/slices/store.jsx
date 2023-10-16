import axiosInstance from "../../axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCartegories = createAsyncThunk("/autocount/cartegories", async () => {
	const cartegories = await axiosInstance.get("/categories");
	const { data } = cartegories;
	const { status, payload } = data;
	if (status) return payload;
});


export const getStock = createAsyncThunk("/autocount/stock", async () => {
	const stock = await axiosInstance.get("/stock");
	const { data } = stock;
	const { status, payload } = data;
	if (status) return payload;
});



export const autoCountSlices = createSlice({
	name: "AutoCountStore",
	initialState: {
		cartegories: [],
		stock: [],
		loading: {
			cartegories: false,
			stock: false,
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
	},
});




export default autoCountSlices.reducer;
