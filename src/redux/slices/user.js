import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Axios } from '../../api/instances';


const initialState = {
    users: [],
    isUsersLoading: false,
}

const getUsers = createAsyncThunk('/users', async () => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        const res = await Axios.get('api/v1/users', options);

        return res.data.data
    } catch (error) {
        throw error.response.data || error.message;
    }
});

const updateAdminStatus = createAsyncThunk('/updateAdminStatus', async ({ user }) => {
    try {
        console.log('user role why here', user.role)
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        const res = await Axios.patch('api/v1/users/role/update', {
            role: user.role, email: user.email
        }, options);

        return res.data.data
    } catch (error) {
        throw error.response.data || error.message;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.isUsersLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isUsersLoading = false;
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isUsersLoading = false;
                state.error = action.error;
            })
            // .addCase(updateAdminStatus.pending, (state, action) => {
                
            // })
            .addCase(updateAdminStatus.fulfilled, (state, action) => {
                 toast.success('Successfully', { autoClose: 2000 })
            })
            .addCase(updateAdminStatus.rejected, (state, action) => {
                toast.error(action.error.message, { autoClose: 2000 })
            })
    }
})

export { getUsers, updateAdminStatus }


export default userSlice.reducer;