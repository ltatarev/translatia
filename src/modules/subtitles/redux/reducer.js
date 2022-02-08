import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  addOriginalSubtitles,
  addUpdatedSubtitles,
  uploadFile,
} from './actions';

const INITIAL_STATE = {
  metadata: {
    currentLine: 0,
    totalLines: 0,
    fileName: '',
    shortFileName: '',
  },
  originalSubtitles: [],
  updatedSubtitles: [],
};

export const subtitlesReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(addOriginalSubtitles, (state, action) => ({
      ...state,
      originalSubtitles: action.payload,
      metadata: {
        ...state.metadata,
        totalLines: _.size(action.payload),
      },
    }))
    .addCase(addUpdatedSubtitles, (state, action) => ({
      ...state,
      updatedSubtitles: [...state.updatedSubtitles, action.payload],
      metadata: {
        ...state.metadata,
        currentLine: _.size([...state.updatedSubtitles, action.payload]),
      },
    }))
    .addCase(uploadFile, (state, action) => ({
      ...state,
      originalSubtitles: action.payload.subtitle,
      metadata: {
        ...state.metadata,
        fileName: action.payload.name,
        shortFileName: _.truncate(action.payload.name, { length: 50 }),
        currentLine: 0,
        totalLines: _.size(action.payload.subtitle),
      },
    }));
});
