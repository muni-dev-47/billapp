import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    billInputForm: {},
    billItems: []
}

const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        setBillFormData: (state, action) => {
            const { name, value } = action.payload;
            state.billInputForm = { ...state.billInputForm, [name]: value }
        },
        addBillItem: (state, action) => {
            const index = state.billItems.findIndex(val => (val.itemName === state.billInputForm.itemName) && (val.itemPrice === state.billInputForm.itemPrice))
            if (index != -1) {
                state.billItems[index] = { ...state.billItems[index], itemCount: Number(state.billItems[index].itemCount) + Number(state.billInputForm.itemCount) };
            } else {
                state.billItems = [...state.billItems, state.billInputForm]
            }
            state.billInputForm = {};
        },
        removeBillItems: (state, action) => {
            return {
                billInputForm: {},
                billItems: []
            }
        },
        setEditFormData: (state, action) => {
            const { name, value } = action.payload;
            state.editFormData = { ...state.editFormData, [name]: value };
        },
        updateBillItem: (state, action) => {
            const { index } = action.payload;

            if (state.editFormData && state.billItems[index]) {
                const editItem = state.editFormData;

                const duplicateIndex = state.billItems.findIndex((item, i) =>
                    i !== index &&
                    item.itemName === editItem.itemName &&
                    item.itemPrice === editItem.itemPrice
                );

                if (duplicateIndex !== -1) {
                    state.billItems[duplicateIndex].itemCount =
                        Number(state.billItems[duplicateIndex].itemCount) +
                        Number(editItem.itemCount);

                    state.billItems.splice(index, 1);
                } else {
                    state.billItems[index] = editItem;
                }

                delete state.editFormData;
            }
        }
        ,
        setEditItems: (state, action) => {
            state.editFormData = state.editFormData || {};
            state.editFormData = action.payload;
        },
        deleteBillItem: (state, action) => {
            const { index } = action.payload;
            state.billItems.splice(index, 1);
        },
        editBillItems: (state, action) => {
            state.billItems = [...state.billItems, ...action.payload]
        }
    }
})

export const { setBillFormData, addBillItem, removeBillItems, setEditFormData, updateBillItem, setEditItems, deleteBillItem, editBillItems } = billSlice.actions;
export default billSlice.reducer;