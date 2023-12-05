import React from 'react';
import PropTypes from 'prop-types';
import { Button, Offcanvas } from 'react-bootstrap';

import backBtn from '../../../assets/images/Arrow-left.svg';
import AddressCard from '../../../components/address-card/add-address';
const MultipleAddressesCanvas = (props) => {
  const { 
    show,
    handleHide,
    title,
    btnText,
    action,
    addBtnAction,
    addressArr,
    handleSelect
  }  = props;


  return (
    <>
      <Offcanvas show={show} onHide={handleHide} backdrop='static' placement='end' className='Canvas w-50' >

        <Offcanvas.Header className='canvasHeader'>
          <img src={backBtn} alt='back btn' className='backBtn' onClick={handleHide}/>
          <Offcanvas.Title className='canvasTitle'><h4>{title}</h4></Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='canvasBody'>
          <hr/>
          <Button className='px-5 addAddressBtn' onClick={addBtnAction}>{'Add New'}</Button>
          { addressArr?.length && addressArr.map((address, index) => 
            <div
              key={index}
              style={{marginTop: '1rem'}}>
              <AddressCard 
                userName={address.userName}
                userContact={address.userContact}
                userAddress={address.userAddress}
                userCity={address.userCity}
                userProvince={address.userProvince}
                userCountry={address.userCountry}
                btnText={'Select'}
                action={() => {
                  handleSelect(address);
                  handleHide();
                }}
              />
            </div>) }
          <Button className='px-5 actionBtn' onClick={() => action()}>{btnText}</Button>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
};

MultipleAddressesCanvas.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  action: PropTypes.func,
  handleSelect: PropTypes.func.isRequired
  
};

export default MultipleAddressesCanvas;
