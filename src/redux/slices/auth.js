import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios, ZohoAxios } from '../../api/instances';
import { navigate } from '../../utils/utils'

const initialState = {
    isAuthenticated: true,
    isZohoAuthenticated: false,
    isLoading: false,
    error: null,
}

const login = createAsyncThunk('login', async ({ email, password }) => {
    try {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('zohoAuthenticated') 

        const response = await Axios.post('v1/login', {
            email,
            password
        }, {
            'Content-Type': 'application/json'
        });
        return response

    } catch (error) {
        throw error.response.data || error.message;
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(state) {
            localStorage.clear()
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                
                localStorage.setItem('accessToken', JSON.stringify(action.payload.data.data.accessToken))
                localStorage.setItem('refreshToken', JSON.stringify(action.payload.data.data.refreshToken))
                state.isLoading = false;
                state.isAuthenticated = true;
                console.log(action.payload)
                state.isZohoAuthenticated = action.payload.data.data.isZohoAuthenticated;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.error;
            })

    }
})

export { login }

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;