import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://666ece08f1e1da2be521333d.mockapi.io/Crud-Operation';

export const fetchUsers = createAsyncThunk('crud/fetchUsers', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const createUser = createAsyncThunk('crud/createUser', async (user) => {
  const response = await axios.post(apiUrl, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('crud/deleteUser', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

export const updateUser = createAsyncThunk('crud/updateUser', async ({ id, user }) => {
  const response = await axios.put(`${apiUrl}/${id}`, user);
  return response.data;
});

const crudSlice = createSlice({
  name: 'crud',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default crudSlice.reducer;
