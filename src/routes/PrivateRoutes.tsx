import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { validateUser } from "../sessions/auth/sessionAuth";

export default function PrivateRoutes({ children  } : any) {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const loggedIn = useSelector((state: RootState) => state.sessionAuth.loggedIn);
    const fromLocation = (location.state as any)?.from || { pathname: '/login' };

    useEffect(()=>{
        async function fetchAuthorization(){

            const response = await dispatch(validateUser());

        }

        fetchAuthorization();
    },[])

    if (loggedIn) {
        return children;
      }
    
      return <Navigate to={fromLocation} state={{ from: location }} replace />;
}