import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import '../../../styles/index.css';
import Header from '../../../components/header';
import InputField from '../../../components/forms';
import CustomButton from '../../../components/buttons';
import { verifyToken, resetPassword } from '../../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import Password from 'antd/es/input/Password';
import { Spinner } from 'react-bootstrap';


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tokenIsValid, setTokenIsValid] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {

        const action = await dispatch(verifyToken(token));
        const isValid = action.payload;
        console.log('isValid?', isValid)
        setTokenIsValid(isValid);

      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
      }
    };

    checkTokenValidity();
  }, [token, dispatch]);

  const handleResetButton = async () => {
    try {

      if (!Password || !confirmPassword) {
        alert("Please fill both fields.");
      } else if (confirmPassword !== password) {
        alert("Passwords do not match.");
      } else {

        console.log('tokenIsValid?', tokenIsValid)

        if (tokenIsValid) {
          setShowSpinner(true);

          setTimeout(() => {
            dispatch(resetPassword({ token, password }));
            navigate('/reset-successful');
          }, 2000);

        } else {
          alert('Link has expired.');
        }
      }

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
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
  return (
    <>
      {showSpinner ? (
        <div className='loadSpinner'>

          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className='sectionContainer'>
          <div className='sectionHeader'>
            <Header title='New Password'></Header>
          </div>
          <div className='formContainer'>
            <div className='inputField'>
              <InputField
                label='Enter new password'
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

            <div className='formButton'>
              <CustomButton variant='primary'
                size='sm'
                id='1'
                active='true'
                text='Reset Password'
                onClick={handleResetButton}>
              </CustomButton>
            </div>

          </div>
        </div>
      )
      }
    </>
  );
};

export default ResetPassword;