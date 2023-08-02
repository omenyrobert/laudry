import { configureStore } from "@reduxjs/toolkit";
import schoolSheetReducer from "./schoolSheetSlices/schoolStore";

const store = configureStore({
	reducer: { schoolStore: schoolSheetReducer },
});
export default store;
