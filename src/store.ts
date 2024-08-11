// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { sessionAuthSliceReducer } from './sessions/auth/sessionAuth';
import { sessionTasksSliceReducer } from './sessions/tasks/sessionTasks';

export const store = configureStore({
  reducer: {
    sessionAuth: sessionAuthSliceReducer,
    sessionTasks: sessionTasksSliceReducer
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
