import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { useSelector } from 'react-redux';
import * as REQUEST_REQUIREMENTS from '../../api/requestRequirements';
import { loginUserWithEmailAndPassword, registerUserWithEmailAndPassword } from '../../api/sessionApi';


export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthState {
    currentUserEmail: string;
    loading: boolean
}

const initialState: AuthState = {
  currentUserEmail: '',
  loading: false
};

export const loginUser = createAsyncThunk(
  'sessionAuth/loginUser',
  async (payload: LoginBody, { rejectWithValue }) => {

    const response = await loginUserWithEmailAndPassword(
      payload.email,
      payload.password
      );

    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);

export const registerUser = createAsyncThunk(
  'sessionAuth/registerUser',
  async (payload: RegisterBody, { rejectWithValue }) => {

    const response = await registerUserWithEmailAndPassword(
      payload.email,
      payload.password,
      payload.passwordConfirmation
      );


    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);  

const authSlice = createSlice({
  name: 'sessionAuth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action: any) => {
      state.loading = false;
      state.currentUserEmail = action.payload.user.email;
    })
    .addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
    })
    }
});

export const sessionAuthSliceReducer = authSlice.reducer;
export const sessionAuthSliceActions = authSlice.actions;

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