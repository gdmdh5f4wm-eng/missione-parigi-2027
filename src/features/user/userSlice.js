import { createSlice } from '@reduxjs/toolkit'

const getSavedUser = () => {
  try {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('disney_user') : null
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    return null
  }
}

const saved = getSavedUser()

const initialState = {
  name: saved ? saved.name : '',
  email: saved ? saved.email : '',
  photo: saved ? saved.photo : ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.photo = action.payload.photo
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('disney_user', JSON.stringify(action.payload))
        }
      } catch (e) {}
    },

    setSignOutState: (state) => {
      state.name = null
      state.email = null
      state.photo = null
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('disney_user')
        }
      } catch (e) {}
    }
  }
})

export const { setUserLoginDetails, setSignOutState } = userSlice.actions

export const selectUserName = (state) => state.user.name
export const selectUserEmail = (state) => state.user.email
export const selectUserPhoto = (state) => state.user.photo

export default userSlice.reducer
