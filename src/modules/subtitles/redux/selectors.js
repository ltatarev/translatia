import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { MODULE_NAME } from '../const';

const getSubtitlesState = (state) => state[MODULE_NAME];

export const getCurrentFileData = createSelector(
  [getSubtitlesState],
  (state) => state.metadata,
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
