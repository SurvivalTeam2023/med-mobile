import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  password: null,
  rePassword: null,
  loading: false,
  error: null,
  current: null,
};

//create async function using Redux Thunk "action_name"
export const signUp = createAsyncThunk(
  "user/signUp",
  async (
    { userName, emailAddress, password, rePassword },
    { rejectWithValue }
  ) => {
    try {
      await axios
        .post(
          "http://dev.mediatation.tokyo/api/user/user",
          {
            username: userName,
            email: emailAddress,
            password: password,
            repassword: rePassword,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          setAccessToken(res.data.accessToken);
          return accessToken;
        });
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://dev.mediatation.tokyo/api/user/user",
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // sign up
    [signUp.pending]: (state) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload; // sign up successful
    },

    //failed
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // sign in
    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload; // sign up successful
    },

    //failed
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;
