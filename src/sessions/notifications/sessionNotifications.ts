import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllNotifications } from '../../api/sessionApi';

export interface Notification {
    taskid: number;
    description: string;
    createdAt: number;
}
export interface  NotificationsState {
    notifications: Notification[];
    opened: boolean;
    errors: string[]
}

const initialState: NotificationsState = {
    notifications: [],
    opened: false,
    errors: []
};

export const getNotifications = createAsyncThunk(
  'sessionNotifications/getNotifications',
  async (_, { rejectWithValue }) => {

    const response = await getAllNotifications();

    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);

const notificationsSlice = createSlice({
  name: 'sessionNotifications',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(getNotifications.pending, (state) => {
            state.errors = [];
        })
        .addCase(getNotifications.fulfilled, (state, action: any) => {
            state.errors = [];
            state.notifications = convertKeysToCamelCase(action.payload);
        })
        .addCase(getNotifications.rejected, (state, action: any) => {
            state.errors = convertKeysToCamelCase(action.payload);
      })
    }
});

export const sessionTasksSliceReducer = notificationsSlice.reducer;
export const sessionTasksSliceActions = notificationsSlice.actions;

// function storeAuthHeader(headers: any) {
//     localStorage.setItem('accept', REQUEST_REQUIREMENTS.ACCEPT);
//     localStorage.setItem('accessToken', headers["access-token"]);
//     localStorage.setItem('client', headers["client"]);
//     localStorage.setItem('uid', headers["uid"]);
//   }

// function removeAuthHeaders() {
//     localStorage.removeItem('accept');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('client');
//     localStorage.removeItem('uid');
// }

export function convertKeysToCamelCase(obj: any): any {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
    } else if (obj.constructor === Object) {
      const newObj: { [key: string]: any } = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );
          newObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        }
      }
      return newObj;
    }
  }
  return obj;
}