import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios, ZohoAxios } from '../../api/instances';
import { navigate } from '../../utils/utils'

const initialState = {
    isLoading: false,
    error: null,
    zohoAccessToken: '',
    zohoRefreshToken: ''
}

const zoho = createAsyncThunk('zoho', async ({ code }) => {
    try {

        const response = await Axios.post('v1/zoho/token/generate', {
            code
        });


        console.log('response')
        console.log(response);
        localStorage.setItem('zohoToken', JSON.stringify(response.data.data))

    } catch (error) {
        console.log(error)
        throw error.response.data || error.message;
    }
});

const zohoSlice = createSlice({
    name: "zoho",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(zoho.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(zoho.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem('zohoAuthenticated', true)
            })
            .addCase(zoho.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

    }
})

export { zoho }


export default zohoSlice.reducer;