import '../../../styles/index.css';
import Header from '../../../components/header';
import { useNavigate } from 'react-router-dom';
const CheckEmail = () => {

    return(
        <>
            <div className='sectionContainer'>
                <div className='sectionHeader'>
                    <Header title='Check your mail'>
                    </Header>
                </div>
                <div><div>
                    <h4>An Email has been sent to your account.</h4></div>
                    </div>
                
            </div>  
        </>
    );
};

export default CheckEmail;
