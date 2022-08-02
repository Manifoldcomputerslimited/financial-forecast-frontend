import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../api/instances';
import { navigate } from '../../utils/utils'

const initialState = {
    isLoading: false,
    error: null,
    zohoAccessToken: '',
    zohoRefreshToken: ''
}

const zoho = createAsyncThunk('zoho', async ({ code }) => {
    try {

        console.log('always calling', code);
        const response = await Axios.post('v1/zoho/token/generate', {
            code
        });

        console.log('response')
        console.log(response);
        // localStorage.setItem('zohoToken', JSON.stringify(response.data.data))

    } catch (error) {
        console.log('zoho main error', error)
        throw error.response.data || error.message;
    }
});

const zohoRefresh = createAsyncThunk('zoho/refresh', async () => {
    const res = await Axios.get('v1/zoho/token/refresh')
   
    return res.data.data
})

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
            .addCase(zohoRefresh.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(zohoRefresh.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem('zohoAuthenticated', true)
                localStorage.setItem('zohoAccessToken', JSON.stringify(action.payload.zohoAccessToken))
            })
            .addCase(zohoRefresh.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })

    }
})

export { zoho, zohoRefresh }


export default zohoSlice.reducer;