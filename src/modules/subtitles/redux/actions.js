import { createAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { arrayToSrt } from '../../editor/services';
import {
  getCurrentFileData,
  getOriginalSubtitles,
  getUpdatedSubtitles,
} from './selectors';

export const addOriginalSubtitles = createAction('ADD_ORIGINAL_SUBTITLES');

export const addUpdatedSubtitles = createAction('ADD_UPDATED_SUBTITLES');

export const uploadFile = createAction('UPLOAD_FILE');

export const reset = createAction('RESET');

export const downloadSuccess = createAction('DOWNLOAD_SUCCESS');

export function exportSrt() {
  return (dispatch, getState) => {
    const state = getState();

    const originalSubtitles = getOriginalSubtitles(state);
    const updatedSubtitles = getUpdatedSubtitles(state);
    const updatedSubtitlesSize = _.size(updatedSubtitles);

    const { fileName } = getCurrentFileData(state);

    const subtitles = [
      ...updatedSubtitles,
      ..._.slice(originalSubtitles, updatedSubtitlesSize),
    ];

    const subtitlesStr = arrayToSrt(subtitles);

    return dispatch(downloadSuccess({ fileName, subtitles: subtitlesStr }));
  };
}
