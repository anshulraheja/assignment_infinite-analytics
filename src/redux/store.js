import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoice/invoiceSlice';

export default configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});
