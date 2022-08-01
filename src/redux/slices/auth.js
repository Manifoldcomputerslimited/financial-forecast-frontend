import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios, ZohoAxios } from '../../api/instances';
import { navigate } from '../../utils/utils'

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

const login = createAsyncThunk('login', async ({ email, password }) => {
    try {
        localStorage.clear();
        const response = await Axios.post('v1/login', {
            email,
            password
        });

        localStorage.setItem('token', JSON.stringify(response.data.data))


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
                state.isLoading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

    }
})

export { login }

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;