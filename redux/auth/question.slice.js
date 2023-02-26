import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answer: [],
};

const reducer = createSlice({
  name: "question",
  initialState,
  reducers: {
    storeAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      if (
        state.answer
          .map((obj) => {
            return obj.questionId;
          })
          .includes(questionId) &&
        !state.answer
          .map((obj) => {
            return obj.optionId;
          })
          .includes(optionId)
      ) {
        state.answer = [
          ...state.answer.filter((obj) => {
            return obj.questionId !== questionId;
          }),
          action.payload,
        ];
      } else {
        state.answer = [
          ...state.answer,
          { questionId: questionId, optionId: optionId },
        ];
      }
    },
  },
});

export const questionAction = {
  ...reducer.actions,
};
export const questionReducer = reducer.reducer;
