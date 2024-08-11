import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { useSelector } from 'react-redux';
import * as REQUEST_REQUIREMENTS from '../../api/requestRequirements';
import { getExistingTasks, loginUserWithEmailAndPassword, registerUserWithEmailAndPassword } from '../../api/sessionApi';


export interface LoginBody {
  email: string;
  password: string;
}

export interface Task {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  taskStatus: TaskStatus;
}

export interface TaskStatus{
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  tasks: Task[];
  loading: boolean;
}

const initialState: AuthState = {
  tasks: [],
  loading: false
};


export const getTasks = createAsyncThunk(
  'sessionTasks/getTasks',
  async (_, { rejectWithValue }) => {

    const response = await getExistingTasks();


    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);  

const tasksSlice = createSlice({
  name: 'sessionTasks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTasks.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTasks.fulfilled, (state, action: any) => {
      state.loading = false;

      state.tasks = convertKeysToCamelCase(action.payload);
    })
    .addCase(getTasks.rejected, (state, action: any) => {
      state.loading = false;
    })
    }
});

export const sessionTasksSliceReducer = tasksSlice.reducer;
export const sessionTasksSliceActions = tasksSlice.actions;

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

export function getLocalStorageAuthHeaders(){
  const authHeader = {
    accept: localStorage.getItem('accept') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    client: localStorage.getItem('client') || '',
    uid: localStorage.getItem('uid') || ''
  }
  return authHeader
}

export const localAuthHeader = () =>{
  const authHeader = {
    accept: localStorage.getItem('accept') || "",
    accessToken: localStorage.getItem('accessToken') || "",
    client: localStorage.getItem('client') || "",
    uid: localStorage.getItem('uid') || ""
  }
  return authHeader
}

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