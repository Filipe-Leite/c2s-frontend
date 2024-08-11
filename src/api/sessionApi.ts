import axios, { AxiosRequestConfig } from 'axios';
import * as REQUEST_REQUIREMENTS from './requestRequirements';

export const authApi = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_HOST
})

export const tasksApi = axios.create({
    baseURL: process.env.REACT_APP_TASKS_API_HOST
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

export async function getExistingTasks(){

  return tasksApi
           .get(REQUEST_REQUIREMENTS.GET_ALL_TASKS_ENDPOINT)
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