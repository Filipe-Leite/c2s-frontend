export const LOGIN_ENDPOINT = '/auth/login'
export const REGISTER_ENDPOINT = '/auth/register'
export const GET_ALL_TASKS_ENDPOINT = '/tasks'
export const CREATE_TASK_ENDPOINT = '/create_task'
export const EDIT_TASK_ENDPOINT = '/edit_task'
export const VALIDATE_TOKEN_ENDPOINT = '/auth/validate_token'
export const LOGOUT_ENDPOINT = '/auth/logout'
export const MAKE_WEB_SCRAPING1_ENDPOINT = '/web_scraper'
export const GET_TASK_STATUSES_ENDPOINT = '/tasks_status'
export const GET_ALL_NOTIFICATIONS_ENDPOINT = '/index_notifications'
export interface RouteParams {
    taskId: number;
}

export interface EndPoints {
    DELETE_TASK_ENDPOINT: string;
}

export interface PrivateRoutesParams {
    ROUTE_PARAMS: RouteParams;
}


export function handlePrivateRoutes({ROUTE_PARAMS}: PrivateRoutesParams){

    const ENDPOINTS = {
            DELETE_TASK_ENDPOINT: `/delete_task/${ROUTE_PARAMS?.taskId}`,
        }

    return ENDPOINTS
}