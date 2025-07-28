import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setFormInput: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearInput: (state, action) => {
            return {};
        },
        setUpdateFormData: (state, action) => {
            return { ...action.payload }
        },
        
        
    }
})

export const { setFormInput, clearInput, setUpdateFormData } = inputSlice.actions;
export default inputSlice.reducer;