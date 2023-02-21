import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionId: null,
  optionId: null,
};

const reducer = createSlice({
  name: "question",
  initialState,
  reducers: {
    storeOptionId: (state, action) => {
      state.optionId = action.payload;
    },
    storeQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
  },
});

export const questionAction = {
  ...reducer.actions,
};
export const questionReducer = reducer.reducer;
