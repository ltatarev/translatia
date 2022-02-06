import { createAction } from '@reduxjs/toolkit';

export const addOriginalSubtitles = createAction('ADD_ORIGINAL_SUBTITLES');

export const addUpdatedSubtitles = createAction('ADD_UPDATED_SUBTITLES');

export const uploadFile = createAction('UPLOAD_FILE');
