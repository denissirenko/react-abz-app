import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  links: {},
  status: 'idle',
  registrated: false,
};

const defaultLink = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';

export const fetchUsers = createAsyncThunk('users/fetchUsersStatus', async (link = defaultLink) => {
  const { users, links } = await fetch(link)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
  return { users, links };
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
    setRegistrated: (state) => {
      state.registrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.users = [...state.users];
        state.links = {};
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.push(...action.payload.users);
        state.links = action.payload.links;
        state.status = 'idle';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.users = [];
        state.links = {};
        state.status = 'failed';
      });
  },
});

export const selectUsersData = (state) => state.users;

export const { resetUsers, setRegistrated } = usersSlice.actions;

export default usersSlice.reducer;
