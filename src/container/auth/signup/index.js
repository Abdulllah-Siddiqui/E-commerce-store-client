import React, { useState } from 'react';
import '../../../styles/index.css';
import Header from '../../../components/header';
import InputField from '../../../components/forms';
import CustomButton from '../../../components/buttons';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';


const Signup = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [contact, setContact] = useState('');
    const [contactError, setContactError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSignupButton = () => {
        const userData = {
            name,
            email,
            password,
            mobile: contact,
        };
        if (!name || !email || !password || !contact) {
            alert('Please fill in all fields.');
        } else if (emailError || passwordError || contactError) {
            alert('Please input valid values.');
        } else if (confirmPassword !== password) {
            alert("Passwords do not match.");
        } else {
            setShowSpinner(true);

            setTimeout(() => {
                dispatch(userSignup(userData));
                navigate('/check-email');
            }, 2000);
        }

    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
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
        const newPassword = (e.target.value);
        setPassword(newPassword);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setPasswordError('Password must contain Capital, small letter, number and symbols')

        } else {
            setPasswordError('');
        }
    };
    const handleConfirmPassword = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        console.log('password', password);
        console.log('confirmPassword', confirmPassword);

        if (newConfirmPassword !== password) {
            setConfirmPasswordError("Passwords don't match.");
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleContactChange = (e) => {
        const newContact = e.target.value;
        setContact(newContact);

        const contactPattern = /^\+[0-9]+$/;
        if (!contactPattern.test(newContact)) {
            setContactError('Contact number should start with a "+" ');
        } else {
            setContactError('');
        }
    };

    return (

        <>
            {showSpinner ? (
                <div className='loadSpinner'>

                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <div className='sectionContainer'>
                    <div className='sectionHeader'>
                        <Header title='Sign Up'></Header>
                    </div>
                    <div className='formContainer'>
                        <div className='inputField'>
                            <InputField
                                label='Full Name'
                                type='text'
                                value={name}
                                className='subInputField'
                                placeholder='Full Name'
                                onChange={handleNameChange}>
                            </InputField>

                        </div>
                        <div className='inputField'>
                            <InputField
                                label='Email address'
                                type='email'
                                value={email}
                                className='subInputField'
                                placeholder='email address'
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
                            <div className='inputError'>{passwordError}</div>
                        </div>
                        <div className='inputField'>
                            <InputField
                                label='Confirm password'
                                type='password'
                                value={confirmPassword}
                                className='subInputField'
                                placeholder='Confirm password'
                                onChange={handleConfirmPassword}>
                            </InputField>
                            <div className='inputError'>{confirmPasswordError}</div>

                        </div>
                        <div className='inputField'>
                            <InputField
                                label='Mobile'
                                type='text'
                                value={contact}
                                className='subInputField'
                                placeholder='mobile'
                                onChange={handleContactChange}>
                            </InputField>
                            <div className='inputError'>{contactError}</div>

                        </div>

                        <div className='formButton'>
                            <CustomButton variant='primary'
                                size='sm'
                                id='1'
                                active='true'
                                text='Signup'
                                onClick={handleSignupButton}>
                            </CustomButton>
                        </div>
                        <div className='linkDiv'>
                            <span>Already have an account ? </span>
                            <Link className='redirectLink' to='/login'>Login</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;