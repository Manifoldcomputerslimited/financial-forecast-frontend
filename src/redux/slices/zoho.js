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
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null

        const res = await Axios.post('api/v1/zoho/token/generate', {
            code: code
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return res.data.data

    } catch (error) {
        console.log('I got this zoho error', error)
        throw error.response.data || error.message;
    }
});

const zohoRefresh = createAsyncThunk('zoho/refresh', async () => {
    let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const res = await Axios.get('api/v1/zoho/token/refresh', options)

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
                localStorage.setItem('zohoAccessToken', JSON.stringify(action.payload.zohoAccessToken))
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