/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin, setAuthStates } from '../../../redux/reducers/authSlice';

import '../../../styles/index.css';

import Header from '../../../components/header';
import InputField from '../../../components/forms';
import CheckboxField from '../../../components/checks';
import CustomButton from '../../../components/buttons';
import {Spinner} from 'react-bootstrap';


import { Link } from 'react-router-dom';

const Login = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    // const { isAdmin } = useSelector((state) => state.auth);
    const { success, isAdmin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(success, isAdmin);

    // const handleLoginButton = async () => {

    //     if(!email || !password)
    //     {
    //         alert('Credentials are required!');
    //     }
    //     else
    //     {if (success) {
    //         console.log('success => ', success)
    //         console.log('is admin success1', isAdmin);

    //         dispatch(setAuthStates({ field: 'success', value: false }))
    //         if (isAdmin) {
    //             console.log('is admin success2');
    //             navigate('/');
    //         } else {
    //             navigate('/user-home');
    //         }
    //     };
    //         dispatch(userLogin({ email, password }));
    //     }

    // };

    // useEffect(() => {
    //     console.log('Successfully logged in', success);
    //     if (success) {
    //         console.log('success => ', success)
    //         dispatch(setAuthStates({ field: 'success', value: false }))
    //                 console.log('login admin check', isAdmin);
    //         if (isAdmin) {
    //             navigate('/admin-dashboard');
    //         } else {
    //             navigate('/user-home');
    //         }
    //     }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [success]);

    const handleLoginButton = () => {
        if ( !email || !password) {
            alert('Please fill in all fields.');
          }else if(emailError){
            alert('Please input a valid email.');
          } 
          else {
            setShowSpinner(true);
            setTimeout(() => {
                dispatch(userLogin({ email, password }));
                console.log('login admin check', isAdmin);
                navigate('/');
              }, 2000);

        }
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(newEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };


    return (
        <>
          {showSpinner ? (
            <div className='loadSpinner'>

                <Spinner id="loadSpinner"animation="border" variant="primary" />
            </div>
      ) : (
            <div className='sectionContainer'>
                <div className='sectionHeader'>
                    <Header title='Login'></Header>
                </div>
                <div className='formContainer'>
                    <div className='inputField'>
                        <InputField
                            label='Enter email address'
                            type='email'
                            value={email}
                            className='subInputField'
                            placeholder='Please enter your email'
                            onChange={handleEmailChange}>
                        </InputField>
                        <div className='inputError'>{emailError}</div>
                    </div>
                    <div className='inputField'>
                        <InputField
                            label='Password'
                            type='password'
                            value={password}
                            className='subInputField'
                            placeholder='Please enter password'
                            onChange={handlePasswordChange}>
                        </InputField>
                    </div>
                    <div className='checkboxField'>
                        <CheckboxField
                            type='checkbox'
                            label='Remember me'
                            isChecked={isChecked}
                            onChange={handleCheckboxChange}>
                        </CheckboxField>
                    </div>
                    <div className='formButton'>
                        <CustomButton variant='primary'
                            size='sm'
                            id='1'
                            active='true'
                            text='Login'
                            type='submit'
                            onClick={handleLoginButton}>
                        </CustomButton>
                    </div>
                    <div className='linkDiv'>
                        <span>Forgot Password ! </span>
                        <Link className='redirectLink' to='/forgot-password'>Reset</Link>
                    </div>
                    <div className='linkDiv'>
                        <span>I don't have an account ! </span>
                        <Link className='redirectLink' to='/signup'>Signup</Link>
                    </div>
                </div>
            </div>
      )}
        </>
    );
};

export default Login;