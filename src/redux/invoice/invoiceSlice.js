import { createSlice } from '@reduxjs/toolkit';
import mockInvoices from '../../../data/mock-data';
const initialState = {
  invoices: mockInvoices,
  filterStatus: '',
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addInvoice, deleteInvoice, setFilterStatus } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
