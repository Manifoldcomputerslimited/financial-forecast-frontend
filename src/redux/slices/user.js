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
        const res = await Axios.get('/users', options);

        return res.data.data
    } catch (error) {
        throw error.response.data || error.message;
    }
});

const updateAdminStatus = createAsyncThunk('/updateAdminStatus', async ({ user }) => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        const res = await Axios.patch('/users/role/update', {
            role: user.role, email: user.email
        }, options);

        return res.data.data
    } catch (error) {
        throw error.response.data || error.message;
    }
});

const deleteUser = createAsyncThunk('/deleteUser', async ({ email }) => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        await Axios.delete(`/users/delete/${email}`, options);

        // return res.data.data
    } catch (error) {
        throw error.response.data || error.message;
    }
});



const userSlice = createSlice({
    name: "user",
    initialState,
    // reducers: {
    //     deleteUser: (state) => {
    //         state.value += 1
    //     },
    // },
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
                toast.success('Successful', { autoClose: 2000 })
            })
            .addCase(updateAdminStatus.rejected, (state, action) => {
                toast.error(action.error.message, { autoClose: 2000 })
            })
            // .addCase(deleteUser.pending, (state, action) => {

            // })
            .addCase(deleteUser.fulfilled, (state, action) => {
                toast.success('Successful', { autoClose: 2000 })
            })
            .addCase(deleteUser.rejected, (state, action) => {
                toast.error(action.error.message, { autoClose: 2000 })
            })
    }
})

// export const deleteUserAsync = (data) =>  async (dispatch) => {
//     try{
//         const res = await Axios.delete();
//         dispatch(getUser())
//     }catch(e){
//         throw new Error(e)
//     }
// }

export { getUsers, updateAdminStatus, deleteUser }


export default userSlice.reducer;