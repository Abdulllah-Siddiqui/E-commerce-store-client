import '../../../styles/index.css';
import Header from '../../../components/header';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/buttons';
const ResetSuccessful = () => {

    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('/login');

    }

    return (
        <>
            <div className='sectionContainer'>
                <div className='sectionHeader'>
                    <Header title='Password reset successful'>
                    </Header>
                </div>
                <div>
                    <div>
                        <h4>Your password has been reset successfully, you can now proceed to login.</h4></div>
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
        </>
    );
};

export default ResetSuccessful;