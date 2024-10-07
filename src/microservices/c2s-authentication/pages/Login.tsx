import c2sLogo from '../../../assets/c2s-logo.png'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { loginUser, validateUser } from '../../../sessions/auth/sessionAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as ENDPOINTS from '../../../endpoints';
import './login.css';

export default function Login(){
    const [emailForm, setEmailForm] = useState<string>('');
    const [passwordForm, setPasswordForm] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchLogin(){
            const response = await dispatch(validateUser())

            if (response.meta.requestStatus == 'fulfilled'){
                navigate(ENDPOINTS.HOME)
            }
        }

        fetchLogin();
    },[])

    async function handleSubmitLogin(emailForm: string, passwordForm: string){
        
        if (emailForm === '' || passwordForm === '') {
            return toast.error("Please fill out all fields")
        }
        else {

            const response = await dispatch(loginUser({ email: emailForm, 
                                                        password: passwordForm }));

            if (response.meta.requestStatus === 'fulfilled'){
                navigate(ENDPOINTS.HOME)
            } else if (response.payload.error){
                toast.error(response.payload.error)
            }
        }
    }

    return(
        <div id='login-page'>
            <div id='login-container'>
                <div id='login-container-top'>
                    <div id='login-container-img-subtitle'>
                        <img src={c2sLogo} alt='c2s-logo'/>
                        <h4>Microservices Senior Test</h4>
                    </div>
                </div>

                <div id='login-container-center'>
                    <h1>Login</h1>
                    <div id='login-container-form'>
                        <div id='login-container-label-field'>
                            <label>E-mail: </label>
                            <input type="text" 
                                placeholder='E-mail'
                                name='email'
                                value={emailForm} 
                                onChange={(event)=>{setEmailForm(event.target.value)}}
                            />
                        </div>
                        <div id='login-container-label-field'>
                            <label>Password: </label>
                            <input type="text" 
                                placeholder='Password'
                                name='password'
                                value={passwordForm} 
                                onChange={(event)=>{setPasswordForm(event.target.value)}}
                            />
                        </div>
                    </div>
                </div>
                <div id='login-container-bottom'>
                    <button onClick={() => handleSubmitLogin(emailForm, passwordForm)}>
                        Login
                    </button>
                    <a onClick={() => navigate(ENDPOINTS.REGISTER_ENDPOINT)}>
                        Register
                    </a>
                </div>
            </div>
        </div>
    )
}