import '../../../styles/index.css';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isVerified, verifyToken } from '../../../redux/reducers/authSlice';
import { Spinner } from 'react-bootstrap';

import CustomButton from '../../../components/buttons';
const VerifyUser = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
   
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

    const handleLoginButton = async () => {
        try{
            if (tokenIsValid) {
                setShowSpinner(true);
      
                setTimeout(() => {
                  dispatch(isVerified( token ));
                  navigate('/login');
                }, 2000);
      
              } else {
                alert('Link has expired.');
              }

        }catch(error){
            console.error('Error:', error);
            alert('An error occurred.');

        }

    }

    return (
        <>
        {showSpinner ? (
        <div className='loadSpinner'>

          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        
            <div className='sectionContainer'>
                <div className='sectionHeader'>
                    <Header title='Verification Successful '>
                    </Header>
                </div>
                <div>
                    <div>
                        <h4>Your email has been verified, you can now proceed to login.</h4></div>
                </div>
                <div className='formContainer1'>
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

                </div>

            </div>
             )
            }
        </>
    );
};

export default VerifyUser;