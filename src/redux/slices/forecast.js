import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../api/instances';
import { toast } from 'react-toastify';

let fileDownload = require('js-file-download');

const initialState = {
  isGeneratingReport: false,
  isDownloadingReport: false,
  isExchangeRateLoading: false,
  isUpdateExchangeRateLoading: false,
  isExchangeRateListLoading: false,
  isBankAccountsLoading: false,
  isSynchronizing: false,
  rate: {
    id: null,
    latest: null,
  },
  error: null,
  forecastInfo: {
    forecastNumber: 3,
    forecastPeriod: 'month',
  },
  forecastDropdown: {
    durations: [
      {
        id: 1,
        forecastPeriod: 'month',
        forecastNumber: 1,
        label: 'Current Month',
      },
      {
        id: 2,
        forecastPeriod: 'month',
        forecastNumber: 2,
        label: 'Next Month',
      },
      {
        id: 3,
        forecastPeriod: 'month',
        forecastNumber: 3,
        label: '3 Months',
      },
      {
        id: 4,
        forecastPeriod: 'month',
        forecastNumber: 6,
        label: '6 Months',
      },
      {
        id: 4,
        forecastPeriod: 'month',
        forecastNumber: 12,
        label: '12 Months',
      },
    ],
    selectedPeriod: 2,
  },
  report: {
    openingBalance: {
      naira: null,
      dollar: null,
    },
    totalCashInflow: {
      naira: null,
      dollar: null,
    },
    totalCashOutflow: {
      naira: null,
      dollar: null,
    },
    closingBalance: {
      naira: null,
      dollar: null,
    },
  },
  invoices: [],
  bills: [],
  sales: [],
  purchases: [],
  rates: [],
  bankAccounts: [],
};

const getBankAccounts = createAsyncThunk('/bank-accounts', async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null;
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await Axios.get('zoho/bank/accounts', options);

    return res.data.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
});

const getExchangeRates = createAsyncThunk('/rates', async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null;
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await Axios.get('zoho/exchange/rate', options);

    return res.data.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
});

const exchangeRate = createAsyncThunk(
  'rate',
  async ({ forecastNumber, forecastPeriod }) => {
    try {
      let accessToken = localStorage.getItem('accessToken')
        ? JSON.parse(localStorage.getItem('accessToken'))
        : null;

      const res = await Axios.get(
        `/zoho/exchange/rate/${forecastNumber}/${forecastPeriod}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data.data;
    } catch (error) {
      throw error.response.data || error.message;
    }
  }
);

const updateExchangeRate = createAsyncThunk(
  'updateRate',
  async ({ id, latestRate, forecastNumber, forecastPeriod }) => {
    try {
      let accessToken = localStorage.getItem('accessToken')
        ? JSON.parse(localStorage.getItem('accessToken'))
        : null;
      let zohoAccessToken = localStorage.getItem('zohoAccessToken')
        ? JSON.parse(localStorage.getItem('zohoAccessToken'))
        : null;

      const res = await Axios.put(
        `/zoho/exchange/rate/${id}`,
        {
          forecastPeriod,
          forecastNumber,
          zohoAccessToken,
          latest: latestRate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data.data;
    } catch (error) {
      throw error.response.data || error.message;
    }
  }
);

const generateReport = createAsyncThunk(
  'generate',
  async ({ id, forecastNumber, forecastPeriod }) => {
    try {
      let accessToken = localStorage.getItem('accessToken')
        ? JSON.parse(localStorage.getItem('accessToken'))
        : null;
      let zohoAccessToken = localStorage.getItem('zohoAccessToken')
        ? JSON.parse(localStorage.getItem('zohoAccessToken'))
        : null;

      const res = await Axios.post(
        '/zoho/generate/report',
        {
          forecastNumber,
          forecastPeriod,
          zohoAccessToken,
          download: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      let response = {
        id,
        forecastNumber,
        forecastPeriod,
        data: res.data.data,
      };
      return response;
    } catch (error) {
      throw error.response.data || error.message;
    }
  }
);

const downloadReport = createAsyncThunk(
  'download',
  async ({ forecastNumber, forecastPeriod, filename }) => {
    try {
      let zohoAccessToken = localStorage.getItem('zohoAccessToken')
        ? JSON.parse(localStorage.getItem('zohoAccessToken'))
        : null;

      const res = Axios.post(
        '/zoho/generate/report',
        {
          zohoAccessToken,
          forecastNumber,
          forecastPeriod,
          download: true,
        },
        { responseType: 'arraybuffer' }
      ).then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        fileDownload(blob, `${filename}.xlsx`); //
      });

      return res;
    } catch (error) {
      throw error.response.data || error.message;
    }
  }
);

const resynApplication = createAsyncThunk('/resync', async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null;
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await Axios.delete('/zoho/forecast/resync', options);

    return res.data.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(generateReport.pending, (state, action) => {
        state.isGeneratingReport = true;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.invoices = action.payload.data.invoices;
        state.sales = action.payload.data.sales;
        state.bills = action.payload.data.bills;
        state.purchases = action.payload.data.purchases;
        state.forecastDropdown.selectedPeriod = action.payload.id;
        state.forecastInfo.forecastPeriod = action.payload.forecastPeriod;
        state.forecastInfo.forecastNumber = action.payload.forecastNumber;
        state.report.openingBalance = action.payload.data.report.openingBalance;
        state.report.totalCashInflow =
          action.payload.data.report.totalCashInflow;
        state.report.totalCashOutflow =
          action.payload.data.report.totalCashOutflow;
        state.report.closingBalance = action.payload.data.report.closingBalance;
        state.isGeneratingReport = false;
      })
      .addCase(generateReport.rejected, (state, action) => {
        toast.warning('An error occured while generating report', {
          autoClose: 2000,
        });
        state.isGeneratingReport = false;
      })
      .addCase(downloadReport.pending, (state, action) => {
        state.isDownloadingReport = true;
      })
      .addCase(downloadReport.fulfilled, (state, action) => {
        state.isDownloadingReport = false;
        toast.success('Report downloaded', { autoClose: 2000 });
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.isDownloadingReport = false;
        toast.error(action.error.message, { autoClose: 2000 });
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
        toast.success('Exchange rate updated', { autoClose: 2000 });
      })
      .addCase(updateExchangeRate.rejected, (state, action) => {
        state.isUpdateExchangeRateLoading = false;
        toast.error(action.error.message, { autoClose: 2000 });
      })
      .addCase(getExchangeRates.pending, (state, action) => {
        state.isExchangeRateListLoading = true;
      })
      .addCase(getExchangeRates.fulfilled, (state, action) => {
        state.isExchangeRateListLoading = false;
        state.rates = action.payload;
      })
      .addCase(getExchangeRates.rejected, (state, action) => {
        state.isExchangeRateListLoading = false;
      })
      .addCase(getBankAccounts.pending, (state, action) => {
        state.isBankAccountsLoading = true;
      })
      .addCase(getBankAccounts.fulfilled, (state, action) => {
        state.isBankAccountsLoading = false;
        state.bankAccounts = action.payload;
      })
      .addCase(getBankAccounts.rejected, (state, action) => {
        state.isBankAccountsLoading = false;
      })
      .addCase(resynApplication.pending, (state, action) => {
        state.isSynchronizing = true;
      })
      .addCase(resynApplication.fulfilled, (state, action) => {
        state.isSynchronizing = false;
        toast.success('resynced', { autoClose: 2000 });
      })
      .addCase(resynApplication.rejected, (state, action) => {
        state.isSynchronizing = false;
        toast.error(action.error.message, { autoClose: 2000 });
      });
  },
});

export {
  generateReport,
  downloadReport,
  exchangeRate,
  updateExchangeRate,
  getExchangeRates,
  getBankAccounts,
  resynApplication,
};

export default forecastSlice.reducer;
