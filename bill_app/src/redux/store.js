import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./inputSlice"
import customerSlice from "./customerSlice"
import billSlice from "./billSlice"

export const store = configureStore({
    reducer: {
        formData: inputSlice,
        customer: customerSlice,
        bill: billSlice
    }
})