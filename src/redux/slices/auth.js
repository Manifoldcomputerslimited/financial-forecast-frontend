import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Axios } from '../../api/instances';
import { history } from '../../utils/utils'

const initialState = {
    isAuthenticated: false,
    isZohoAuthenticated: true,
    isAuthLoading: false,
    error: null,
    isChangePasswordLoading: false
}

const login = createAsyncThunk('login', async ({ email, password }) => {
    try {
        localStorage.clear()

        const response = await Axios.post('api/v1/login', {
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
        const res = await Axios.post('api/v1/password/update', {
            currentPassword, newPassword
        }, {
            'Content-Type': 'application/json'
        });

        console.log('response change password', res)
        //  window.location.reload(true)
        return res;

    } catch (error) {
        throw error.response.data || error.message;
    }
});

const inviteUser = createAsyncThunk("/invite", async ({ email }) => {

    try {
        const res = await Axios.post('api/v1/invite', {
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

const signup = createAsyncThunk("/register", async ({ data,
    inviteToken }) => {
    console.table('signup', data)
    console.log('inviteToken', inviteToken)
    try {
        const res = await Axios.post('api/v1/register', {
            ...data,
            inviteToken
        }, {
            'Content-Type': 'application/json'
        });

        console.log('response register user', res)
        return res;

    } catch (error) {
        throw error.response.data || error.message;
    }
});

const forgotPassword = createAsyncThunk("/forgotPassword", async ({ email }) => {

    try {
        const res = await Axios.post('api/v1/password/forgot', {
            email
        }, {
            'Content-Type': 'application/json'
        });

        console.log('response forgot password user', res)
        return res;

    } catch (error) {
        throw error.response.data || error.message;
    }
});

const reset = createAsyncThunk("/reset", async ({ password, token }) => {

    try {
        const res = await Axios.post('api/v1/password/reset', {
            password, token
        }, {
            'Content-Type': 'application/json'
        });

        console.log('response forgot password user', res)
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
            .addCase(signup.pending, (state, action) => {
                // state.isChangePasswordLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {

                toast.success('Registration successful', { autoClose: 2000 })

                //state.isChangePasswordLoading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                // state.isChangePasswordLoading = false;
                // state.error = action.error;
                toast.error(action.error.message, { autoClose: 2000 })
            })
            .addCase(changePassword.pending, (state, action) => {
                state.isChangePasswordLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isChangePasswordLoading = false;
                toast.success('Password changed successfully', { autoClose: 2000 })
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isChangePasswordLoading = false;
                state.error = action.error;
                toast.error(action.error.message, { autoClose: 2000 })
            })
            .addCase(forgotPassword.pending, (state, action) => {
                //state.isChangePasswordLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                //state.isChangePasswordLoading = false;
                toast.success('Check your email to reset your password', { autoClose: 5000 })
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                //state.isChangePasswordLoading = false;
                //state.error = action.error;
                toast.error(action.error.message, { autoClose: 2000 })
            })
            .addCase(inviteUser.pending, (state, action) => {
                // state.isChangePasswordLoading = true;
            })
            .addCase(inviteUser.fulfilled, (state, action) => {
                toast.success('Invitation sent successfully')
                //state.isChangePasswordLoading = false;
            })
            .addCase(inviteUser.rejected, (state, action) => {
                toast.error(action.error.message)
                // state.isChangePasswordLoading = false;
                // state.error = action.error;
            })
            .addCase(reset.pending, (state, action) => {
                // state.isChangePasswordLoading = true;
            })
            .addCase(reset.fulfilled, (state, action) => {
                toast.success('Password reset successful', { autoClose: 2000 })
                //state.isChangePasswordLoading = false;
            })
            .addCase(reset.rejected, (state, action) => {
                toast.error(action.error.message)
                // state.isChangePasswordLoading = false;
                // state.error = action.error;
            })
    }
})

export { login, signup, forgotPassword, changePassword, reset, inviteUser }

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;