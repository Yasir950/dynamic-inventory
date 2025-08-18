import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  updatedObj: null,
  isAddForm: false,
  token:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatedData: (state, action) => {
      state.updatedObj = action.payload
      state.isAddForm = true
    },
    clearData: (state) => {
      console.log('clearData', state)
        state.updatedObj = null
      },
    changeForm: (state) => {
        state.isAddForm = !state.isAddForm
      },
      closeForm: (state) => {
        state.isAddForm = false
      },
      setToken: (state, action) => {
        state.token = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { updatedData, changeForm, clearData, setToken,closeForm } = userSlice.actions

export default userSlice.reducer