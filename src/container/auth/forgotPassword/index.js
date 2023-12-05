import React, {useState} from 'react';
import '../../../styles/index.css';
import Header from '../../../components/header';
import InputField from '../../../components/forms';
import CustomButton from '../../../components/buttons';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { forgotPassword } from '../../../redux/reducers/authSlice';

const ForgotPassword = () => { 

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleForgotPasswordButton = () => {
        dispatch(forgotPassword({email}));
        if(!email){
            alert('Please enter your email');
        }else{
            navigate('/check-email');
        };
    };
    
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(newEmail)) {
            setEmailError('Enter a valid email address.');        
        } else {
            setEmailError('');
        }
    };

    return(
        <>
            <div className='sectionContainer'>
                <div className='sectionHeader'>
                    <Header title='Forgot Password'>
                    </Header>
                </div>
                <div className='formContainer'>  
                    <div className='inputField'>
                         <InputField
                            label='Enter email address'
                            type='email'
                            value={email}
                            placeholder='Please enter your email'
                            className='subInputField'
                            onChange={handleEmailChange}>
                        </InputField>
                        <div className='inputError'>{emailError}</div> 
                    </div>
                    <div className='formButton'>
                        <CustomButton variant='primary' 
                            size='sm' 
                            id='1'  
                            active='true' 
                            text='Forgot Password' 
                            onClick={handleForgotPasswordButton}>
                        </CustomButton>
                    </div>
                    <div className='linkDiv'>
                        <span>No, I remember my password </span>
                        <Link className='redirectLink' to='/login'>Login</Link>
                     </div>
                </div>
            </div>  
        </>
    );
};

export default ForgotPassword;
