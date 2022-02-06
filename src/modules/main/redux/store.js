import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { MODULE_NAME, subtitlesReducer } from '../../subtitles';

const persistConfig = {
  key: 'main',
  storage,
};

const logger = createLogger();

const reducers = combineReducers({ [MODULE_NAME]: subtitlesReducer });
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});