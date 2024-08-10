// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { sessionAuthSliceReducer } from './sessions/auth/sessionAuth';

export const store = configureStore({
  reducer: {
    sessionAuth: sessionAuthSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
                                                      ReturnType,
                                                      RootState,
                                                      unknown,
                                                      Action<string>
                                                    >;
