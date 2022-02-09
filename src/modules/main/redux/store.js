import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { MODULE_NAME, subtitlesReducer } from '../../subtitles';

const persistConfig = {
  key: 'main',
  storage,
};

const logger = createLogger();

const development = import.meta.env.MODE === 'development';

const middlewares = [thunk];

if (development) {
  middlewares.push(logger);
}

const reducers = combineReducers({ [MODULE_NAME]: subtitlesReducer });
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
