import './appToolBar.css';
import C2sLogo from '../../assets/c2s-logo.png'
import NotificationsIcon from '../../assets/notifications-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logoutUser } from '../../sessions/auth/sessionAuth';
import { useNavigate } from 'react-router-dom';
import * as ENDPOINTS from '../../endpoints';

export default function AppToolBar(){
    const currentUserEmail = useSelector((state: RootState) => state.sessionAuth.currentUserEmail);
    const dispatch = useDispatch<AppDispatch>();
    const notifications = [1,2,3,4,5,6,7,5,4]
    const navigate = useNavigate();

    async function handleLogout(){
        const response = await dispatch(logoutUser());

        if(response.meta.requestStatus === 'fulfilled'){
            localStorage.removeItem('Authorization');
            navigate(ENDPOINTS.HOME);
        }
    } 

    return(
        <div id='tool-bar'>
            <div id='image-app-name'>
                <img src={C2sLogo}/>
                <h1>C2S Senior Test</h1>
            </div>
            
            <div id='container-email-notifications'>
                <h2>{currentUserEmail}</h2>
                <div id='notifications-button'>
                    {notifications.length > 10 ?
                        <h6 id='notifications-number'>+10</h6>
                    :
                    <h6 id='notifications-number'>{notifications.length}</h6>
                    }
                    <img src={NotificationsIcon}/>
                </div>
                <button id='containerlogout-button'
                        onClick={() => {handleLogout()}}>
                    Logout
                </button>
            </div>
        </div>
    )
}