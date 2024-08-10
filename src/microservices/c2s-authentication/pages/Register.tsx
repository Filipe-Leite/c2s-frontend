import './login.css'
import c2sLogo from '../../../assets/c2s-logo.png'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { loginUser, registerUser } from '../../../sessions/auth/sessionAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as ENDPOINTS from '../../../endpoints';
import './register.css';

export default function Register(){
    const [emailForm, setEmailForm] = useState<string>('');
    const [passwordForm, setPasswordForm] = useState<string>('');
    const [passwordConfirmationForm, setPasswordConfirmationForm] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    async function handleSubmitRegister(emailForm: string, passwordForm: string) {
        if (emailForm === '' || passwordForm === '') {
            return toast.error("Please fill out all fields")
        }
        else {

            const response = await dispatch(registerUser({email: emailForm, 
                                                          password: passwordForm,
                                                          passwordConfirmation: passwordConfirmationForm }));

            if (response.payload.error){
                toast.error(response.payload.error)
            }
        }
    }

    return(
        <div id='register-page'>
            <div id='register-container'>
                <div id='register-container-top'>
                    <div id='register-container-img-subtitle'>
                        <img src={c2sLogo} alt='c2s-logo'/>
                        <h4>Microservices Senior Test</h4>
                    </div>
                </div>

                <div id='register-container-center'>
                    <h1>Register</h1>
                    <div id='register-container-form'>
                        <div id='register-container-label-field'>
                            <label>E-mail: </label>
                            <input type="text" 
                                placeholder='E-mail'
                                name='email'
                                value={emailForm} 
                                onChange={(event)=>{setEmailForm(event.target.value)}}
                            />
                        </div>
                        <div id='register-container-label-field'>
                            <label>Password: </label>
                            <input type="text" 
                                placeholder='Password'
                                name='password'
                                value={passwordForm} 
                                onChange={(event)=>{setPasswordForm(event.target.value)}}
                            />
                        </div>
                        <div id='register-container-label-field'>
                            <label>Password Confirmation: </label>
                            <input type="text" 
                                placeholder='Password Confirmation'
                                name='passwordConfirmation'
                                value={passwordConfirmationForm} 
                                onChange={(event)=>{setPasswordConfirmationForm(event.target.value)}}
                            />
                        </div>
                    </div>
                </div>
                <div id='register-container-bottom'>
                    <button onClick={() => handleSubmitRegister(emailForm, passwordForm)}>
                        Register
                    </button>
                    <a onClick={() => navigate(ENDPOINTS.LOGIN_ENDPOINT)}>
                        Login
                    </a>
                </div>
            </div>
        </div>
    )
}