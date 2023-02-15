import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../api/instances';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  isOverdraftLoading: false,
  error: null,
  zohoAccessToken: '',
  zohoRefreshToken: '',
  overdrafts: [],
};

const zoho = createAsyncThunk('zoho', async ({ code }) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null;

    const res = await Axios.post(
      '/zoho/token/generate',
      {
        code: code,
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
});

const zohoRefresh = createAsyncThunk('zoho/refresh', async () => {
  let accessToken = localStorage.getItem('accessToken')
    ? JSON.parse(localStorage.getItem('accessToken'))
    : null;
  let options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const res = await Axios.get('/zoho/token/refresh', options);

  return res.data.data;
});

const createOverdraft = createAsyncThunk(
  '/overdraft/create',
  async ({ data }) => {
    try {
      let accessToken = localStorage.getItem('accessToken')
        ? JSON.parse(localStorage.getItem('accessToken'))
        : null;

      const res = await Axios.post(
        '/zoho/overdraft',
        {
          ...data,
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

const getOverdrafts = createAsyncThunk('/overdrafts', async () => {
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
    const res = await Axios.get('zoho/overdraft', options);

    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    throw error.response.data || error.message;
  }
});

const deleteOverdraft = createAsyncThunk(
  '/deleteOverdraft',
  async ({ accountId }) => {
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
      await Axios.delete(`/zoho/overdraft/${accountId}`, options);

      // return res.data.data
    } catch (error) {
      throw error.response.data || error.message;
    }
  }
);

const zohoSlice = createSlice({
  name: 'zoho',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(zoho.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(zoho.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('zohoAuthenticated', true);
        localStorage.setItem(
          'zohoAccessToken',
          JSON.stringify(action.payload.zohoAccessToken)
        );
        localStorage.setItem(
          'zohoTokenExpiry',
          JSON.stringify(action.payload.zohoTokenExpiry)
        );
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
        localStorage.setItem('zohoAuthenticated', true);
        localStorage.setItem(
          'zohoAccessToken',
          JSON.stringify(action.payload.zohoAccessToken)
        );
      })
      .addCase(zohoRefresh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(createOverdraft.pending, (state, action) => {
        state.isOverdraftLoading = true;
      })
      .addCase(createOverdraft.fulfilled, (state, action) => {
        state.isOverdraftLoading = false;
        toast.success('Successful', { autoClose: 2000 });
      })
      .addCase(createOverdraft.rejected, (state, action) => {
        state.isOverdraftLoading = false;
        toast.error(action.error.message, { autoClose: 2000 });
      })
      .addCase(getOverdrafts.pending, (state, action) => {
        state.isOverdraftLoading = true;
      })
      .addCase(getOverdrafts.fulfilled, (state, action) => {
        state.isOverdraftLoading = false;
        state.overdrafts = action.payload;
      })
      .addCase(getOverdrafts.rejected, (state, action) => {
        state.isOverdraftLoading = false;
      })
      .addCase(deleteOverdraft.fulfilled, (state, action) => {
        toast.success('Deleted successfully', { autoClose: 2000 });
      })
      .addCase(deleteOverdraft.rejected, (state, action) => {
        toast.error(action.error.message, { autoClose: 2000 });
      });
  },
});

export { zoho, zohoRefresh, createOverdraft, getOverdrafts, deleteOverdraft };

export default zohoSlice.reducer;
