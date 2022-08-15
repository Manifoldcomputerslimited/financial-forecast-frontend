import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Axios } from '../../api/instances';
import { history } from '../../utils/utils'

const initialState = {
    user: {},
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    isZohoAuthenticated: true,
    isAuthLoading: false,
    error: null,
    isChangePasswordLoading: false,
    inviteUserLoading: false,
    isUserLoading: false,
    isResetPasswordLoading: false,
    isForgotPasswordLoading: false,
    isForgotPasswordSuccess: false,
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
        console.log('my error', error)
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

const getUser = createAsyncThunk("/me", async () => {
    console.log('fantastic working ')
    let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
    try {
        const res = await Axios.get('api/v1/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('responseget user', res)
        return res.data.data;

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
                toast.error(action.error.message, { autoClose: 2000 })
            })
            .addCase(signup.pending, (state, action) => {
                state.isSignupLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isSignupLoading = false;
                toast.success('Registration successful', { autoClose: 2000 })
            })
            .addCase(signup.rejected, (state, action) => {
                state.isSignupLoading = false;
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
            .addCase(getUser.pending, (state, action) => {
                state.isUserLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload
                state.isUserLoading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isUserLoading = false
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.isForgotPasswordLoading = true;
                state.isForgotPasswordSuccess = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isForgotPasswordLoading = false;
                state.isForgotPasswordSuccess = true;

                toast.success('Check your email to reset your password', { autoClose: 5000 })
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isForgotPasswordLoading = false;
                state.isForgotPasswordSuccess = false;
                toast.error(action.error.message, { autoClose: 2000 })
            })
            .addCase(inviteUser.pending, (state, action) => {
                state.inviteUserLoading = true;
            })
            .addCase(inviteUser.fulfilled, (state, action) => {
                toast.success('Invitation sent successfully')
                state.inviteUserLoading = false;
            })
            .addCase(inviteUser.rejected, (state, action) => {
                toast.error(action.error.message)
                state.inviteUserLoading = false;
            })
            .addCase(reset.pending, (state, action) => {
                state.isResetPasswordLoading = true;
            })
            .addCase(reset.fulfilled, (state, action) => {
                toast.success('Password reset successful', { autoClose: 2000 })
                state.isResetPasswordLoading = false;
            })
            .addCase(reset.rejected, (state, action) => {
                toast.error(action.error.message)
                state.isResetPasswordLoading = false;
            })
    }
})

export { login, signup, getUser, forgotPassword, changePassword, reset, inviteUser }

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;