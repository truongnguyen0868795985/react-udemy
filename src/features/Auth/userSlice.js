const { createSlice } = require('@reduxjs/toolkit');

const fetchUserById = createAsyncThunk('users/fetchByIdStatus', async (userId, thunkAPI) => {
  const response = await userApi.fetchById(userId);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {
    increase(state) {
      return state + 1;
    },
    decrease(state) {
      return state - 1;
    },
  },
});

const { actions, reducer } = userSlice;

export const { increase, decrease } = actions;
export default reducer;
