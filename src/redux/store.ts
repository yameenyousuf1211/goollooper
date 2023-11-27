import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthSlice from './AuthSlice';
import createTransform from 'redux-persist/es/createTransform';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  transforms: [
    // Exclude boostType property from being persisted
    createTransform(
      (inboundState, key) => {
        if (key === 'auth') {
          const {boostType, userRole, ...rest}: any = inboundState;
          return rest;
        }
        return inboundState;
      },
      (outboundState, key) => {
        if (key === 'auth') {
          return {...outboundState, boostType: null, userRole: null};
        }
        return outboundState;
      },
    ),
  ],
};

const rootReducer = combineReducers({
  auth: AuthSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
