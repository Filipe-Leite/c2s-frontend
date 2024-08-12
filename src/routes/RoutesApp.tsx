import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import Login from '../microservices/c2s-authentication/pages/Login'
import * as ENDPOINTS from '../endpoints'
import Register from '../microservices/c2s-authentication/pages/Register';
import PrivateRoutes from './PrivateRoutes';
import DashBoard from '../microservices/c2s-tasks/pages/DashBoard';
import AppToolBar from '../microservices/c2s-notifications/AppToolBar';

export default function RoutesApp() {

    return (
            <BrowserRouter>
              <Routes>
  
                <Route path={ENDPOINTS.LOGIN_ENDPOINT} element={
                  <PublicRoutes>
                    <Login/>
                  </PublicRoutes>
                } />

                <Route path={ENDPOINTS.REGISTER_ENDPOINT} element={
                  <PublicRoutes>
                    <Register/>
                  </PublicRoutes>
                } />

                <Route path={ENDPOINTS.HOME} element={
                  <PrivateRoutes>
                    <AppToolBar/>
                    <DashBoard/>
                  </PrivateRoutes>
                } />
                    
  
              </Routes>
            </BrowserRouter>
    );
  }