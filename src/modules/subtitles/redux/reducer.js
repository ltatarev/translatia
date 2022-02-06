import { createReducer } from '@reduxjs/toolkit';
import {
  addOriginalSubtitles,
  addUpdatedSubtitles,
  uploadFile,
} from './actions';

const INITIAL_STATE = {
  fileName: '',
  originalSubtitles: [],
  updatedSubtitles: [],
};

export const subtitlesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(addOriginalSubtitles, (state, action) => ({
      ...state,
      originalSubtitles: action.payload,
    }))
    .addCase(addUpdatedSubtitles, (state, action) => ({
      ...state,
      updatedSubtitles: action.payload,
    }))
    .addCase(uploadFile, (state, action) => ({
      ...state,
      originalSubtitles: action.payload.subtitle,
      fileName: action.payload.name,
    }));
});
