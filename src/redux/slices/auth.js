import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../api/instances';

const initialState = {
    isAuthenticated: false,
    isZohoAuthenticated: true,
    isAuthLoading: false,
    error: null,
    isChangePasswordLoading: false
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

const changePassword = createAsyncThunk("/changePassword", async ({ currentPassword, newPassword }) => {
    try {
        const res = await Axios.post('v1/password/reset', {
            currentPassword, newPassword
        }, {
            'Content-Type': 'application/json'
        });

        console.log('response change password', res)
        return res;

    } catch (error) {
        throw error.response.data || error.message;
    }
});

const inviteUser = createAsyncThunk("/invite", async ({ email }) => {
   
    try {
        const res = await Axios.post('v1/invite', {
            email
        }, {
            'Content-Type': 'application/json'
        });

        console.log('response change password', res)
        return res;

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
                state.isAuthLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('accessToken', JSON.stringify(action.payload.data.data.accessToken))
                localStorage.setItem('refreshToken', JSON.stringify(action.payload.data.data.refreshToken))
                state.isAuthLoading = false;
                state.isAuthenticated = true;
                console.log("payload", action.payload)
                state.isZohoAuthenticated = action.payload.data.data.isZohoAuthenticated;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthLoading = false;
                state.isAuthenticated = false;
                state.error = action.error;
            })
            .addCase(changePassword.pending, (state, action) => {
                state.isChangePasswordLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isChangePasswordLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isChangePasswordLoading = false;
                state.error = action.error;
            })
            .addCase(inviteUser.pending, (state, action) => {
                // state.isChangePasswordLoading = true;
            })
            .addCase(inviteUser.fulfilled, (state, action) => {
                //state.isChangePasswordLoading = false;
            })
            .addCase(inviteUser.rejected, (state, action) => {
                // state.isChangePasswordLoading = false;
                // state.error = action.error;
            })

    }
})

export { login, changePassword, inviteUser }

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;