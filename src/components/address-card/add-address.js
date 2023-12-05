import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './add-address.css'

const AddressCard = (props) => {
  const {
    userName,
    userContact,
    userAddress,
    userCity,
    userProvince,
    userCountry,
    btnText,
    action
  }  = props;

  return (
    <div className='AddressWrapper'>
      <div className='AddressFieldWrapper'>
        <div> {'Deliver to: '}<b>{userName}</b> </div>
        <div> {` Mobile #: ${userContact}`} </div>
        <div> {` Address: ${userAddress} - ${userCity} - ${userProvince} - ${userCountry}`} </div>
      </div>
      <Button
        variant='outline-primary'
        onClick={action}
        className='addressChangeBtn'>
        {btnText}
      </Button>
    </div>
  );
};

AddressCard.propTypes = {
  userName: PropTypes.string,
  userContact: PropTypes.string,
  userAddress: PropTypes.string,
  userCity: PropTypes.string,
  userProvince: PropTypes.string,
  userCountry: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func
  
};

export default AddressCard;