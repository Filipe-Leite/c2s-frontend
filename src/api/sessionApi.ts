import axios, { AxiosRequestConfig } from 'axios';
import * as REQUEST_REQUIREMENTS from './requestRequirements';

export const authApi = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_HOST
})

export const tasksApi = axios.create({
    baseURL: process.env.REACT_APP_TASKS_API_HOST
})

export const notificationsApi = axios.create({
  baseURL: process.env.REACT_APP_NOTIFICATIONS_API_HOST
})

export const webScrapApi = axios.create({
    baseURL: process.env.REACT_APP_WEB_SCRAP_API_HOST,
    withCredentials: true
})

export async function loginUserWithEmailAndPassword(email: string, 
                                                     password: string
                                                    ) {

    const data = {
        email: email,
        password: password
    };
    
    return authApi
        .post(REQUEST_REQUIREMENTS.LOGIN_ENDPOINT, data)
            .then((response: any) => {
                return response;
            })
            .catch((error:any) => {
                return error.response;
            });
}

export async function registerUserWithEmailAndPassword(email: string, 
                                                       password: string,
                                                       passwordConfirmation: string
                                                    ) {

    const data = {
                  email: email,
                  password: password,
                  passwordConfirmation: passwordConfirmation
    };


    return authApi
           .post(REQUEST_REQUIREMENTS.REGISTER_ENDPOINT, convertKeysToSnakeCase(data))
                .then((response: any) => {
                    return response;
                })
                .catch((error:any) => {
                    return error.response;
                });
}

export async function validateUserWithToken() {

    return authApi
          .get(REQUEST_REQUIREMENTS.VALIDATE_TOKEN_ENDPOINT,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
            }})
            .then((response: any) => {
              return response;
            })
            .catch((error:any) => {
              return error.response;
            });
}

export async function logoutUserWithToken() {

  return authApi
        .delete(REQUEST_REQUIREMENTS.LOGOUT_ENDPOINT,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
          }})
          .then((response: any) => {
            return response;
          })
          .catch((error:any) => {
            return error.response;
          });
}

export async function getExistingTasks(){

  return tasksApi
                .get(REQUEST_REQUIREMENTS.GET_ALL_TASKS_ENDPOINT,{
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
                  }})
                .then((response: any) => {
                    return response;
                })
                .catch((error:any) => {
                    return error.response;
                });
}

export async function createTaskWithUrl(url: string){

  return tasksApi
         .post(REQUEST_REQUIREMENTS.CREATE_TASK_ENDPOINT,{url},{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
              }})
              .then((response: any) => {
                  return response;
              })
              .catch((error:any) => {
                  return error.response;
              });
}

export async function editTaskStatus(taskId: number, taskStatusId: number){

  const bodyData = {
    id: taskId,
    taskStatusId: taskStatusId
  }

  return tasksApi
         .patch(REQUEST_REQUIREMENTS.EDIT_TASK_ENDPOINT,
                convertKeysToSnakeCase(bodyData),{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
                }})
              .then((response: any) => {
                  return response;
              })
              .catch((error:any) => {
                  return error.response;
              });
}

export async function deleteTaskWithId(taskId: number){

  const routeParams ={
    taskId: taskId
  }

  const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: routeParams});

  return tasksApi
         .delete(PRIVATE_ROUTES.DELETE_TASK_ENDPOINT,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
              }})
              .then((response: any) => {
                  return response;
              })
              .catch((error:any) => {
                  return error.response;
              });
}

export async function getAllTasksStatuses(){

  return tasksApi
         .get(REQUEST_REQUIREMENTS.GET_TASK_STATUSES_ENDPOINT,{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
              }})
              .then((response: any) => {
                  return response;
              })
              .catch((error:any) => {
                  return error.response;
              });
}

function convertKeysToSnakeCase(obj: any): any {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToSnakeCase(item));
      } else {
        if (obj.constructor === Object) {
          const newObj: { [key: string]: any } = {}; // Novo objeto tipado
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const snakeCaseKey =
                key === 'accessToken' ? 'access-token' : key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
              newObj[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
            }
          }
          return newObj;
        }
      }
    }
    return obj;
}