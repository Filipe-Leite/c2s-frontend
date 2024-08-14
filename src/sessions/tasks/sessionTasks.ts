import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTaskWithUrl, 
         deleteTaskWithId, 
         editTaskStatus, 
         getAllTasksStatuses, 
         getExistingTasks, 
         makeWebScrapingWithUrl} from '../../api/sessionApi';


export interface LoginBody {
  email: string;
  password: string;
}

export interface Task {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  taskStatusId: number;
  taskStatus: TaskStatus;
}

export interface TaskStatus {
  id: number;
  describe: string;
}

export interface TaskStatus {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskBody {
  url: string;
}

export interface EditTaskStatusBody {
  taskId: number;
  taskStatusId: number;
}

export interface DeleteTask {
  taskId: number;
}

export interface WebScrapingBody{
  taskId: number;
  url: string;
}

export interface  TasksState {
  tasks: Task[];
  loading: boolean;
  tasksStatuses: TaskStatus[];
}

const initialState: TasksState = {
  tasks: [],
  tasksStatuses: [],
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

export const createTask = createAsyncThunk(
  'sessionTasks/createTask',
  async (payload: CreateTaskBody, { rejectWithValue }) => {

    const response = await createTaskWithUrl(payload.url);

    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);

export const getTasksStatuses = createAsyncThunk(
  'sessionTasks/getTasksStatuses',
  async (_, { rejectWithValue }) => {

    const response = await getAllTasksStatuses();

    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);

export const editTask = createAsyncThunk(
  'sessionTasks/editTask',
  async (payload: EditTaskStatusBody, { rejectWithValue }) => {

    const response = await editTaskStatus(payload.taskId, payload.taskStatusId);

    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);

export const deleteTask = createAsyncThunk(
  'sessionTasks/deleteTask',
  async (payload: DeleteTask, { rejectWithValue }) => {

    const response = await deleteTaskWithId(payload.taskId);

    if (response.status >= 200 && response.status <= 300){
      return response.data;
    }
      return rejectWithValue(response.data);
  }
);


export const makeWebScraping = createAsyncThunk(
  'sessionTasks/makeWebScraping',
  async (payload: WebScrapingBody, { rejectWithValue }) => {

    const response = await makeWebScrapingWithUrl(payload);

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

    .addCase(getTasksStatuses.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTasksStatuses.fulfilled, (state, action: any) => {
      state.loading = false;
      state.tasksStatuses = convertKeysToCamelCase(action.payload);
    })
    .addCase(getTasksStatuses.rejected, (state, action: any) => {
      state.loading = false;
    })
    .addCase(getTasks.pending, (state) => {
      state.loading = true;
      state.tasks = [];
    })
    .addCase(getTasks.fulfilled, (state, action: any) => {
      state.loading = false;
      state.tasks = convertKeysToCamelCase(action.payload);
    })
    .addCase(getTasks.rejected, (state) => {
      state.loading = false;
      state.tasks = [];
    })
    .addCase(createTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(createTask.fulfilled, (state, action: any) => {
      state.loading = false;

      state.tasks = [...state.tasks, convertKeysToCamelCase(action.payload)];
    })
    .addCase(createTask.rejected, (state) => {
      state.loading = false;
    })

    .addCase(editTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(editTask.fulfilled, (state, action: any) => {
      state.loading = false;
      const payloadConvertedCamelCase = convertKeysToCamelCase(action.payload)

      const taskToEditIndex = state.tasks
                                   .findIndex((object: Task) => 
                                               object.id === action.payload.id);

      state.tasks[taskToEditIndex].taskStatusId = payloadConvertedCamelCase.taskStatusId;
    })
    .addCase(editTask.rejected, (state) => {
      state.loading = false;
    })

    .addCase(deleteTask.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteTask.fulfilled, (state, action: any) => {
      state.loading = false;

      state.tasks = state.tasks.filter(task => task.id !== action.meta.arg.taskId);

    })
    .addCase(deleteTask.rejected, (state) => {
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