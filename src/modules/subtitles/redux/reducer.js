import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import { parseSrt } from '../../editor/services';
import {
  addOriginalSubtitles,
  addUpdatedSubtitles,
  reset,
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
    .addCase(addOriginalSubtitles, (state, action) => {
      const content = parseSrt(action.payload);

      return {
        ...state,
        originalSubtitles: content,
        metadata: {
          ...state.metadata,
          totalLines: _.size(content),
        },
      };
    })
    .addCase(addUpdatedSubtitles, (state, action) => ({
      ...state,
      updatedSubtitles: [...state.updatedSubtitles, action.payload],
      metadata: {
        ...state.metadata,
        currentLine: _.size([...state.updatedSubtitles, action.payload]),
      },
    }))
    .addCase(uploadFile, (state, action) => {
      const { subtitle, name } = action.payload;
      const content = parseSrt(subtitle);

      return {
        ...state,
        originalSubtitles: content,
        metadata: {
          ...state.metadata,
          fileName: name,
          shortFileName: _.truncate(name, { length: 50 }),
          currentLine: 0,
          totalLines: _.size(content),
        },
      };
    })
    .addCase(reset, () => INITIAL_STATE);
});
