import { combineReducers } from 'redux';
import { videos } from "./videos";
import member from "./member";
import inGame from './inGame';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}	// 추가

const rootReducer = combineReducers({
  inGame: inGame,
  videos: videos,
  member: member,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;