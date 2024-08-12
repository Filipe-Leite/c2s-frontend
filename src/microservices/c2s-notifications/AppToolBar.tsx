import './appToolBar.css';
import C2sLogo from '../../assets/c2s-logo.png'
import NotificationsIcon from '../../assets/notifications-icon.png'

export default function AppToolBar(){

    const notifications = [1,2,3,4,5,6,7,5,4]

    return(
        <div id='tool-bar'>
            <div id='image-app-name'>
                <img src={C2sLogo}/>
                <h1>C2S Senior Test</h1>
            </div>

            <div id='notifications-button'>
                {notifications.length > 10 ?
                    <h6 id='notifications-number'>+10</h6>
                :
                <h6 id='notifications-number'>{notifications.length}</h6>
                }

                <img src={NotificationsIcon}/>
            </div>
        </div>
    )
}