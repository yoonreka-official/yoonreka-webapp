import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getInvoices } from '~/api/invoice.api.ts';
import { InvoiceType } from '~/types/invoice.type.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { InvoiceParams, Invoice } from '~/types/invoice.type.ts';

export interface InvoiceState {
  isLoading: boolean;
  list: Invoice[];

  invoiceType: InvoiceType;
  selected?: Invoice;
}

const initialState: InvoiceState = {
  list: [],
  isLoading: false,

  invoiceType: InvoiceType.LECTURE,
};

export const fetchInvoices = createAsyncThunk<Invoice[], InvoiceParams>(
  'invoice/fetchInvoices',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await getInvoices(params);
      return Promise.resolve(data.myLectureInvoices);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const InvoiceSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchInvoices.pending, state => {
        state.isLoading = true;
      })

      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchInvoices.rejected, state => {
        state.list = [];
        state.isLoading = false;
      });
  },
  initialState,
  name: 'invoice',
  reducers: {
    setInvoiceType: (state, action: PayloadAction<InvoiceType>) => {
      state.invoiceType = action.payload;
    },

    setSelectedInvoice: (state, action: PayloadAction<Invoice | undefined>) => {
      state.selected = action.payload;
    },
  },
});

export const { setInvoiceType, setSelectedInvoice } = InvoiceSlice.actions;
export default InvoiceSlice;
