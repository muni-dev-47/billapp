import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const postSalesItem = createAsyncThunk(
    'sales/postSalesItem',
    async (salesData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/bill/add', salesData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);


export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async ({ id, name, mobile, address, shopName, balance }, { rejectWithValue }) => {
        try {
            console.log(id)
            const response = await axios.put(`http://localhost:5000/api/customers/update/${id}`, {
                name,
                mobile,
                address,
                shopName,
                balance,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Server error' });
        }
    }
);

export const updateCustomerBill = createAsyncThunk(
    "billing/updateCustomerBill",
    async ({ id, invoiceId, billItems, date }, { rejectWithValue }) => {
        try {
            console.log(id, invoiceId, date)
            const response = await axios.put(
                `http://localhost:5000/api/bill/update/${id}/${invoiceId}`,
                { billItems, date }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || { message: 'Unknown error' });
        }
    }
);

export const addCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (customerData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/customers/add', customerData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const postCreditHistory = createAsyncThunk(
    'creditHistory/postCreditHistory',
    async ({ customerId, amount, paymentMethod, date }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:5000/api/credits/add', {
                customerId,
                amount,
                paymentMethod,
                date
            });

            return response.data;
        } catch (error) {
            console.error('Error adding credit history:', error);
            return thunkAPI.rejectWithValue(error.response?.data || { message: 'Something went wrong' });
        }
    }
);

export const deleteCustomerById = createAsyncThunk(
    'customers/deleteCustomerById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/customers/delete/${id}`);
            return { id, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Unknown error' });
        }
    }
);



export const deleteCustomerBill = createAsyncThunk(
    'customerBills/deleteCustomerBill',
    async ({ id, invoiceId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/bill/delete/${id}/${invoiceId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete customer bill'
            );
        }
    }
);

const initialState = {
    customerDetails: [],
    customerBills: [],
    customersCreditHistory: [],
    customersTransactionHistory: []
}
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addNewCustomer: (state, action) => {
            if (!state.customerDetails.some(val => (val.mobile === action.payload.mobile) && (val.address === action.payload.address)))
                state.customerDetails = [...state.customerDetails, action.payload];
        },
        updateCustomer: (state, action) => {
            const { id } = action.payload;
            const index = state.customerDetails.findIndex(val => val.id === id);
            state.customerDetails[index] = action.payload
        },
        addSales: (state, action) => {
            const { id, billItems, date } = action.payload;

            const allInvoiceIds = state.customerBills.flatMap(customer =>
                customer.bills.map(b => b.invoiceId)
            );

            const year = new Date().getFullYear();

            const thisYearInvoices = allInvoiceIds.filter(id => id?.startsWith(`INV-${year}`));

            let maxNumber = 0;
            for (const inv of thisYearInvoices) {
                const num = parseInt(inv.split('-')[2]);
                if (num > maxNumber) maxNumber = num;
            }

            const newInvoiceId = `INV-${year}-${String(maxNumber + 1).padStart(4, '0')}`;

            const newBill = { invoiceId: newInvoiceId, billItems, date };
            const index = state.customerBills.findIndex(val => val.id === id);

            if (index !== -1) {
                state.customerBills[index].bills.push(newBill);
            } else {
                state.customerBills.push({ id, bills: [newBill] });
            }
            const cusIndex = state.customerDetails.findIndex(val => val.id === id);
            state.customerDetails[cusIndex].balance = state.customerDetails[cusIndex].balance + billItems.reduce((sum, val) => sum + val.itemPrice * val.itemCount, 0)
            const balanceIndex = state.customersTransactionHistory.findIndex(val => val.id === id);
            if (balanceIndex != -1) {
                state.customersTransactionHistory[balanceIndex].history.push({
                    amount: billItems.reduce((sum, val) => sum + val.itemPrice * val.itemCount, 0), date, type: "debit",
                    description: "Customer payment",
                    category: "Payment"
                })
            } else {
                state.customersTransactionHistory.push({
                    id: id, history: [{
                        amount: billItems.reduce((sum, val) => sum + val.itemPrice * val.itemCount, 0), date, type: "debit",
                        description: "Customer payment",
                        category: "Payment"
                    }]
                })
            }
        }, updateSales: (state, action) => {
            const { id, billId, billItems } = action.payload;
            const cusIndex = state.customerBills.findIndex(val => val.id === id);
            const billIndex = state.customerBills[cusIndex].bills.findIndex(val => val.invoiceId === billId);
            const total = billItems.reduce((sum, val) => sum + (val.itemCount * val.itemPrice), 0) - state.customerBills[cusIndex].bills[billIndex].billItems.reduce((sum, val) => sum + (val.itemCount * val.itemPrice), 0);
            state.customerBills[cusIndex].bills[billIndex].billItems = billItems;
            const index = state.customerDetails.findIndex(val => val.id === id);
            state.customerDetails[index].balance = state.customerDetails[index].balance + total

        },
        updateBalance: (state, action) => {
            const { customerId, amount, paymentMethod, date } = action.payload;

            const index = state.customersCreditHistory.findIndex(val => val.customerId === customerId);
            if (index !== -1) {
                state.customersCreditHistory[index].history.push({ amount, paymentMethod, date });
            } else {
                state.customersCreditHistory.push({
                    customerId,
                    history: [{ amount, paymentMethod, date }]
                });
            }

            const cusIndex = state.customerDetails.findIndex(val => val.id === customerId);
            if (cusIndex !== -1) {
                state.customerDetails[cusIndex].balance -= amount;
                const index = state.customersTransactionHistory.findIndex(val => val.id === customerId);
                if (index != -1) {
                    state.customersTransactionHistory[index].history.push({ amount, date, type: "credit", description: "Sales payment", category: "Sales" })
                } else {
                    state.customersTransactionHistory.push({ id: customerId, history: [{ amount, date, type: "credit", description: "Sales payment", category: "Sales" }] })
                }
            }
        },
        deleteBill: (state, action) => {
            const { id, invoiceId } = action.payload;
            const index = state.customerBills.findIndex(val => val.id === id);
            const billIndex = state.customerBills[index].bills.findIndex(val => val.invoiceId === invoiceId);
            state.customerBills[index].bills.splice(billIndex, 1);
        },
        deleteCustomer: (state, action) => {
            const { id } = action.payload;
            const cusIndex = state.customerDetails.findIndex(val => val.id === id);
            const billIndex = state.customerBills.findIndex(val => val.id === id);
            const creditIndex = state.customersCreditHistory.findIndex(val => val.customerId == id);
            const transactionIndex = state.customersTransactionHistory.findIndex(val => val.id === id)
            state.customerDetails.splice(cusIndex, 1);
            state.customerBills.splice(billIndex, 1);
            state.customersCreditHistory.splice(creditIndex, 1);
            state.customersTransactionHistory.splice(transactionIndex, 1)
        },
        fetchCustomers: (state, action) => {
            state.customerDetails = [...action.payload]
        },
        fatchBillItems: (state, action) => {
            if (!state.customerBills.some(val => val.id === action.payload.id))
                state.customerBills.push(action.payload)
            else
                state.customerBills[0].bills = action.payload.bills
        },
        fetchCredits: (state, action) => {
            state.customersCreditHistory.push(action.payload);
        },
        fetchTransactions: (state, action) => {
            state.customersTransactionHistory = action.payload;
        }
    }
})

export const { addNewCustomer, deleteBill, fetchTransactions, fetchCredits, fatchBillItems, addSales, updateSales, updateBalance, fetchCustomers } = customerSlice.actions;
export default customerSlice.reducer;