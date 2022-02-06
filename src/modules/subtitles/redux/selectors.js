import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { MODULE_NAME } from '../const';

const getSubtitlesState = (state) => state[MODULE_NAME];

export const getCurrentFileName = createSelector(
  [getSubtitlesState],
  (state) => state.fileName,
);

export const getOriginalSubtitles = createSelector(
  [getSubtitlesState],
  (state) => state.originalSubtitles,
);

export const isFileUploaded = createSelector(
  [getSubtitlesState],
  (state) => !_.isEmpty(state.originalSubtitles),
);

export const getUpdatedSubtitles = createSelector(
  [getSubtitlesState],
  (state) => state.updatedSubtitles,
);
