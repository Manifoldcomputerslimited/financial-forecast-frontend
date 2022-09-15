import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../api/instances';
var fileDownload = require('js-file-download');
import { navigate } from '../../utils/utils'

const initialState = {
    isGeneratingReport: false,
    isDownloadingReport: false,
    error: null,
    forecastNumber: 3,
    forecastPeriod: 'month'
}



const generateReport = createAsyncThunk('generate', async ({ forecastNumber, forecastPeriod }) => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null

        const res = await Axios.post('api/v1/zoho/opening/balance', {
            forecastNumber, forecastPeriod, zohoAccessToken
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

      
        console.log('response from my app', res.data.data);
        return res.data.data

    } catch (error) {
        console.log('zoho main error', error)
        throw error.response.data || error.message;
    }
});

const downloadReport = createAsyncThunk('download', async ({ forecastNumber, forecastPeriod, filename }) => {
    try {
        let zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null

        const res = Axios.post('api/v1/zoho/report/download', {
            zohoAccessToken,
            forecastNumber,
            forecastPeriod
        }, { responseType: 'arraybuffer' })
            .then(response => {
                const blob = new Blob([response.data], {
                    type:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });

                fileDownload(blob, `${filename}.xlsx`); //
            });

            return res;

    } catch (error) {
        console.log('cannot download report', error)
        throw error.response.data || error.message;
    }
});



const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(generateReport.pending, (state, action) => {
                state.isGeneratingReport = true;
            })
            .addCase(generateReport.fulfilled, (state, action) => {
                state.isGeneratingReport = false;

            })
            .addCase(generateReport.rejected, (state, action) => {
                state.isGeneratingReport = false;
            })
            .addCase(downloadReport.pending, (state, action) => {
                state.isDownloadingReport = true;
            })
            .addCase(downloadReport.fulfilled, (state, action) => {
                state.isDownloadingReport = false;

            })
            .addCase(downloadReport.rejected, (state, action) => {
                state.isDownloadingReport = false;
            })
    }
})

export { generateReport }


export default forecastSlice.reducer;