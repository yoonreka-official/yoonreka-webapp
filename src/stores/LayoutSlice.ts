import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface LayoutState {
  isLoading: boolean
}

const initialState: LayoutState = {
  isLoading: false,
}

const LayoutSlice = createSlice({
  initialState,
  name: 'layout',
  reducers: {
    toggleLoading(state, action: PayloadAction<LayoutState['isLoading']>) {
      state.isLoading = action.payload
    },
  },
})

export const { toggleLoading } = LayoutSlice.actions
export default LayoutSlice
