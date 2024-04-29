import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../core/axios'

const initialState = {
    loading: true,
    data: null,
    error: null
}
export const fetchAuth = createAsyncThunk('user/fetchUserData', async (params) => {
    try {
        const {data} = await axios.post('user/login', params)
        localStorage.setItem("token", data.token)
        return data
    } catch (e) {
        return e.response.data.message
    }
})

export const fetchRegister = createAsyncThunk('user/fetchUserDataRegister', async (params) => {
    try {
        const {data} = await axios.post('user/register', params)
        console.log(data)
        localStorage.setItem("token", data.token)
        return data
    } catch (e) {
        console.log(e)
        return e.response.data
    }
})

export const fetchAuthMe = createAsyncThunk('user/fetchAuthMe', async () => {
    const {data} = await axios.get('user/getMe')
    return data
})
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            if (!action.payload.login) {
                state.data = null
                state.error = action.payload
                state.loading = false
            } else {
                state.data = action.payload
                state.loading = false
                state.error = null
            }
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            if (!action.payload.login) {
                state.data = null
                state.error = action.payload
                state.loading = false
            } else {
                state.data = action.payload
                state.loading = false
                state.error = null
            }
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })

    }
})

export const { logOut } = userSlice.actions

export default userSlice.reducer