import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../api/instances';
var fileDownload = require('js-file-download');
import { navigate } from '../../utils/utils'

const initialState = {
    isGeneratingReport: false,
    isDownloadingReport: false,
    isExchangeRateLoading: false,
    isUpdateExchangeRateLoading: false,
    rate: {
        id: null,
        latest: null,
    },
    error: null,
    forecastInfo: {
        forecastNumber: 3,
        forecastPeriod: 'month'
    },
    forecastDropdown: {
        durations: [
            {
                id: 1,
                forecastPeriod: "month",
                forecastNumber: 1,
                label: "Current Month"
            }, {
                id: 2,
                forecastPeriod: "month",
                forecastNumber: 2,
                label: "Next Month"
            },
            {
                id: 3,
                forecastPeriod: "month",
                forecastNumber: 3,
                label: "3 Months"
            }, {
                id: 4,
                forecastPeriod: "month",
                forecastNumber: 6,
                label: "6 Months"
            }
        ],
        selectedPeriod: 2
    }
}


const exchangeRate = createAsyncThunk('rate', async ({ forecastNumber, forecastPeriod }) => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null

        const res = await Axios.get(`api/v1/zoho/exchange/rate/${forecastNumber}/${forecastPeriod}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });


        console.log('response from exchange rate', res.data.data);
        return res.data.data

    } catch (error) {
        console.log('exchange error', error)
        throw error.response.data || error.message;
    }
});

const updateExchangeRate = createAsyncThunk('updateRate', async ({ id, latestRate, forecastNumber, forecastPeriod }) => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null

        const res = await Axios.put(`api/v1/zoho/exchange/rate/${id}`, {
            forecastPeriod,
            forecastNumber,
            zohoAccessToken,
            latest: latestRate
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });


        console.log('response from update rate', res.data.data);
        return res.data.data

    } catch (error) {
        console.log('exchange error', error)
        throw error.response.data || error.message;
    }
});



const generateReport = createAsyncThunk('generate', async ({ id, forecastNumber, forecastPeriod }) => {
    try {
        console.log('calling generate', id);
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        let zohoAccessToken = localStorage.getItem('zohoAccessToken') ? JSON.parse(localStorage.getItem('zohoAccessToken')) : null

        console.log('forecastNumber', forecastNumber)

        const res = await Axios.post('api/v1/zoho/opening/balance', {
            forecastNumber, forecastPeriod, zohoAccessToken
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });


        console.log('response from my app', res.data.data);
        let response = {
            id,
            forecastNumber,
            forecastPeriod,
            data: res.data.data,
        }
        return response;

    } catch (error) {
        console.log('generate report error', error)
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
                state.forecastDropdown.selectedPeriod = action.payload.id
                state.forecastInfo.forecastPeriod = action.payload.forecastPeriod
                state.forecastInfo.forecastNumber = action.payload.forecastNumber
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
            .addCase(exchangeRate.pending, (state, action) => {
                state.isExchangeRateLoading = true;
            })
            .addCase(exchangeRate.fulfilled, (state, action) => {
                state.rate = action.payload;
                state.isExchangeRateLoading = false;

            })
            .addCase(exchangeRate.rejected, (state, action) => {
                state.isExchangeRateLoading = false;
            })
            .addCase(updateExchangeRate.pending, (state, action) => {
                state.isUpdateExchangeRateLoading = true;
            })
            .addCase(updateExchangeRate.fulfilled, (state, action) => {
                state.rate = action.payload;
                state.isUpdateExchangeRateLoading = false;

            })
            .addCase(updateExchangeRate.rejected, (state, action) => {
                state.isUpdateExchangeRateLoading = false;
            })
    }
})

export { generateReport, downloadReport, exchangeRate, updateExchangeRate }


export default forecastSlice.reducer;