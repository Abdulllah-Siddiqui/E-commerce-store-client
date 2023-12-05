/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import MultipleAddressesCanvas from './multipleAdddressesCanvas';
import { deleteCartItem } from '../../../redux/reducers/cartSlice';
import { fetchUserCart } from '../../../redux/reducers/cartSlice';
import { addAddress } from '../../../redux/reducers/addressSlice';
import { fetchAddress } from '../../../redux/reducers/addressSlice';
import { addPaymentMethod } from '../../../redux/reducers/paymentSlice';
import { fetchPaymentMethods } from '../../../redux/reducers/paymentSlice';
import { emptyCart } from '../../../redux/reducers/cartSlice';
import { placeOrder } from '../../../redux/reducers/orderSlice';
import { nullCart } from '../../../redux/reducers/cartSlice';
import { addNewCard } from '../../../redux/reducers/orderSlice';

import visaCard from '../../../assets/images/visa-card.jpg'
import mastercard from '../../../assets/images/master-card.jpg'
import OffCanvasComponent from '../../../components/offcanvas';
import Header from '../../../components/header';
import deleteIcon from '../../../assets/images/trash-can.svg'
import CustomButton from '../../../components/buttons';
import InputField from '../../../components/forms';
import CheckboxField from '../../../components/checks';
import editPencil from '../../../assets/images/edit-pencil.svg'

const Checkout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector((state) => state.auth.user._id);
  const userName = useSelector((state) => state.auth.user.name);
  const cartItems = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart.cartLength);
  const addresses = useSelector((state) => state.address.addresses);
  const addLength = useSelector((state) => state.address.addresses.length);
  const { stripeCardId } = useSelector((state) => state.payment);
  const { methods } = useSelector((state) => state.payment);

  const [subTotal, setSubTotal] = useState(null);
  const [totalTax, setTotalTax] = useState(null);
  const [finalTotal, setFinalTotal] = useState(null);
  const deliveryFee = 10;

  const [multipleAddresses, setMultipleAddresses] = useState(false);
  const handleAddressChange = () => setMultipleAddresses(true)
  // const handleChangeClose = () => setMultipleAddresses(false)

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleAddAddress = () => setShowAdd(true);
  const [isDefault, setIsDefault] = useState(false);
  const [userAddress, setUserAddress] = useState({});

  const [showPay, setShowPay] = useState(false);
  const handleClosePay = () => setShowPay(false);
  const handleAddPayment = () => setShowPay(true);
  const [cardType, setCardType] = useState('');

  const [formData, setFormData] = useState({
    userName: '',
    userContact: '',
    userCountry: '',
    userProvince: '',
    userCity: '',
    userAddress: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardCountry: '',

  });

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect (()=>{
    if(addresses.length) {
      setUserAddress(addresses[0])
    }
  },[addresses])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setIsEmpty((prevIsEmpty) => ({
      ...prevIsEmpty,
      [name]: value.trim() === '',
    }));
  };

  const handleDeleteItem = (cartID) => {
    dispatch(deleteCartItem({ cartID }));
  };

  const handleAddProductBtn = () => {
    navigate('/');
  };

  const handleSaveAddress = () => {
    handleCloseAdd();
    const newAddress = {
      userID,
      userName: formData.userName,
      userContact: formData.userContact,
      userCountry: formData.userCountry,
      userProvince: formData.userProvince,
      userCity: formData.userCity,
      userAddress: formData.userAddress,
      isDefault
    };

    dispatch(addAddress(newAddress));

    setFormData({
      userName: '',
      userContact: '',
      userCountry: '',
      userProvince: '',
      userCity: '',
      userAddress: '',
      isDefault: false
    });

    setIsEmpty({
      userName: false,
      userContact: false,
      userCountry: false,
      userProvince: false,
      userCity: false,
      userAddress: false,
    });
    // }
  };

  const handleSavePayment = () => {

    handleClosePay();

    const newMethod = {
      userID,
      cardNumber: formData.cardNumber,
      cardExpiry: formData.cardExpiry,
      cardCVC: formData.cardCVC,
      cardCountry: formData.cardCountry,
      cardType,

    }
    dispatch(addPaymentMethod(newMethod));


    setFormData({
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      cardCountry: '',
      cardType: '',
    });
    setIsEmpty({
      cardNumber: false,
      cardType: false,
      cardCVC: false,
      cardCountry: false,
      userCity: false,
      cardExpiry: false,
    });
  };

  const handleEmptyCart = (userID) => {
    dispatch(emptyCart({ userID }));
    dispatch(nullCart());

  }

  const handlePayNow = () => {

    const orderData = {
      userID,
      userName,
      productDetails: cartItems,
      amount: parseFloat(finalTotal.toFixed(2)),
      cardId: stripeCardId
    }
    dispatch(placeOrder(orderData));
    // navigate('/');
  };

  useEffect(() => {
    dispatch(fetchAddress(userID));
  }, [dispatch, userID]);

  useEffect(() => {
    dispatch(fetchPaymentMethods(userID));

  }, [dispatch, userID]);

  useEffect(() => {
    dispatch(fetchUserCart(userID));
  }, []);


  useEffect(() => {
    let totalItems = 0;
    let calculatedSubTotal = 0;

    for (const item of cartItems) {
      totalItems += item.quantity;
      calculatedSubTotal += item.price * item.quantity;
    }
    setSubTotal(parseFloat(calculatedSubTotal.toFixed(2)));
    setTotalTax(parseFloat((subTotal * 0.02).toFixed(2)));
    setFinalTotal(parseFloat((subTotal + totalTax + deliveryFee).toFixed(2)));
  }, [totalTax, cartItems]);

  const handleDefaultAddress = () => {
    setIsDefault(!isDefault);
  }


  return (

    <div className='userContainer'>
      {
        cart === 0 ?
          <div className='emptyShoppingBag'>
            <h3>Your Shopping Bag is empty</h3>
            <br></br>
            <CustomButton
              onClick={() => handleAddProductBtn()}
              size='lg'
              text='Add Product'
            >

            </CustomButton>
          </div>
          :
          <div style={{ backgroundColor: '#F8F9FA' }}>
            <MultipleAddressesCanvas
              show={multipleAddresses}
              handleHide={() => setMultipleAddresses(false)}
              title={'Multiple Addresses'}
              btnText={'Confirm'}
              action={() => setMultipleAddresses(false)}
              addBtnAction={() => {
                setMultipleAddresses(false);
                handleAddAddress();
              }}
              addressArr={addresses}
              handleSelect={setUserAddress}
            />
            <OffCanvasComponent
              name='Add Delivery Address'
              show={showAdd}
              handleClose={handleCloseAdd}
              className='Canvas w-25'
            >
              <div className='addAddressDiv'>
                <Col>
                  <InputField
                    label='Full name'
                    type='text'
                    name='userName'
                    value={formData.userName}
                    className='addAddressInpField'
                    placeholder='Full name'
                    onChange={handleInputChange}
                  ></InputField>
                  <Row>
                    <Col>
                      <InputField
                        label='Mobile #'
                        type='text'
                        name='userContact'
                        value={formData.userContact}
                        className='addAddressInpField'
                        placeholder='Mobile #'
                        onChange={handleInputChange}
                      ></InputField>
                    </Col>
                    <Col>
                      <InputField
                        label='Country'
                        type='text'
                        name='userCountry'
                        value={formData.userCountry}
                        className='addAddressInpField'
                        placeholder='Country '
                        onChange={handleInputChange}
                      ></InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label='Province'
                        type='text'
                        name='userProvince'
                        value={formData.userProvince}
                        className='addAddressInpField'
                        placeholder='Province'
                        onChange={handleInputChange}
                      ></InputField>
                    </Col>
                    <Col>
                      <InputField
                        label='City'
                        type='text'
                        name='userCity'
                        value={formData.userCity}
                        className='addAddressInpField'
                        placeholder='City '
                        onChange={handleInputChange}
                      ></InputField>
                    </Col>
                  </Row>
                  <InputField
                    label='Address'
                    type='text'
                    name='userAddress'
                    value={formData.userAddress}
                    className='addAddressInpField'
                    placeholder='Address '
                    onChange={handleInputChange}
                  ></InputField>
                  <CheckboxField
                    type='checkbox'
                    checked={isDefault}
                    label="Default Address"
                    onClick={handleDefaultAddress}
                  ></CheckboxField>
                  <div className='addAddressDivBtn'>
                    <CustomButton
                      text=' Save '
                      size='sm'
                      onClick={() => {
                        handleSaveAddress();
                      }}
                    ></CustomButton>
                  </div>
                </Col>
              </div>
            </OffCanvasComponent>

            <OffCanvasComponent
              name='Payment Method'
              show={showPay}
              handleClose={handleClosePay}
              className='Canvas w-25'
            >
              <Row>

                <Col>
                  <button className='masterCardBtn' style={{ cursor: 'pointer' }} onClick={() => setCardType('Master')}>
                    <div className='masterCardDiv'>

                      <span><img src={mastercard} alt='mastercard'></img>  Master card</span>
                      <span>**** **** **** 7292</span>
                      <Row>
                        <Col>6/22</Col>
                        <Col>6/27</Col>
                      </Row>
                    </div>
                  </button>
                </Col>
                <Col>
                  <button className='masterCardBtn' style={{ cursor: 'pointer' }} onClick={() => setCardType('Visa')} >
                    <div className='masterCardDiv'>

                      <span><img src={visaCard} alt='mastercard'></img>  Visa card</span>
                      <span>**** **** **** 3356</span>
                      <Row>
                        <Col>4/23</Col>
                        <Col>4/28</Col>
                      </Row>
                    </div>
                  </button>
                </Col>
              </Row>
              <br>
              </br>
              <h5>Add Payment Method</h5>
              <Row>
                <InputField
                  label='Card number'
                  type='text'
                  name='cardNumber'
                  value={formData.cardNumber}
                  className='addAddressInpField'
                  placeholder='Card number'
                  onChange={handleInputChange}
                ></InputField>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label='Expiry date'
                    type='text'
                    name='cardExpiry'
                    value={formData.cardExpiry}
                    className='addAddressInpField'
                    placeholder='Expiry date'
                    onChange={handleInputChange}
                  ></InputField>
                </Col>
                <Col>
                  <InputField
                    label='CVC'
                    type='text'
                    name='cardCVC'
                    value={formData.cardCVC}
                    className='addAddressInpField'
                    placeholder='CVC'
                    onChange={handleInputChange}
                  ></InputField>
                </Col>
              </Row>
              <Row>
                <InputField
                  label='Country'
                  type='text'
                  name='cardCountry'
                  value={formData.cardCountry}
                  className='addAddressInpField'
                  placeholder='Country'
                  onChange={handleInputChange}
                ></InputField>
              </Row>
              <Row>

                <div className='addAddressDivBtn'>
                  <CustomButton
                    text='Save'
                    size='sm'
                    onClick={() => {
                      handleSavePayment();
                    }}
                  ></CustomButton>
                </div>
              </Row>

            </OffCanvasComponent>

            <div className='shoppingBagHeader'>
              <Header
                title='Checkout'
              ></Header>
            </div>
            <div>
              <div className='shoppingBagContainer'>
                <div className='shoppingBagLeftContainer'>
                  <Col xs={12} md={8} >
                    <div className='cartItemDiv'>
                      {addLength === 0 ?
                        <CustomButton
                          text='Add Delivery Address'
                          size='sm'
                          onClick={() => handleAddAddress()}
                        ></CustomButton>
                        :
                        <>
                          <div>
                            <ul>
                            <li>
                                  {`Name: ${userAddress.userName}`}
                                  <br></br>
                                  {`Contact: ${userAddress.userContact}`}
                                  <br></br>
                                  {`Address: ${userAddress.userAddress}`}
                                </li>
                            </ul>
                          </div>
                          <div>
                            <CustomButton
                              variant="primary"
                              text="Change"
                              onClick={handleAddressChange}
                            ></CustomButton>
                            {/* <img src={editPencil} alt='edit'></img> */}

                          </div>
                        </>
                      }
                    </div>
                    {cartItems?.length && cartItems.map((item, index) => (
                      <div className='cartItemDiv' key={index}>
                        <div className='cartItemLeftDiv'>
                          <div>
                            <img className='cartImg' src={item.thumbnail} alt='img'></img>
                          </div>
                          <div>
                            <span>{item.description}</span>
                            <br></br>
                            <br></br>
                            <div className='cartDetailsDiv ' >
                              <span className='d-flex' ><div className='cartColor' style={{ backgroundColor: 'grey' }}></div> {item.colour}</span>
                              <span>Size: {item.size}</span>
                              <span className='qtySpan'>Qty: <strong>{item.quantity} </strong></span>
                              <span className='qtySpan'>Price: <strong>{item.price} </strong></span>
                            </div>
                          </div>
                        </div>
                        <div className='cartItemRightDiv'>
                          <button
                            className='deleteCartBtn'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleDeleteItem(item._id)
                            }}>
                            <img src={deleteIcon} alt='trash-can'></img>
                          </button>
                        </div>
                      </div>
                    ))}
                  </Col>
                </div>
                <div className='shoppingBagRightContainer'>
                  <div>
                    <h5>Order Summary</h5>
                  </div>
                  <div className='orderSummaryDiv'>
                    <div className='orderSummaryContent'>
                      <span>SubTotal:{cart}</span>
                      <span>${subTotal}</span>
                    </div>
                    <div className='orderSummaryContent'>
                      <span>Delivery Fee:</span>
                      <span>${deliveryFee}</span>
                    </div>
                    <div className='orderSummaryContent'>
                      <span>Tax:</span>
                      <span>${totalTax}</span>
                    </div>
                    <div className='orderSummaryContent'>
                      <span>Total:</span>
                      <span>${finalTotal}</span>
                    </div>
                  </div>
                  <br></br>
                  <div>
                    {
                      methods.length === 0 && addLength === 1 ?
                        <>
                          <div>
                            <h5>Select Payment Method</h5>
                          </div>
                          <div className='orderSummaryDiv'>
                            <Col>
                              <div className='addNewPayment'>
                                <CustomButton
                                  className='addNewPayment'
                                  text='&#8853; Add New'
                                  variant='outline-secondary'
                                  onClick={() => handleAddPayment()}
                                >
                                  <span>&#8853; Add New</span>
                                </CustomButton>
                              </div>
                            </Col><Col></Col><Col></Col>
                          </div>
                        </>
                        :
                        <>
                          <div>
                            <h5>Select Payment Method</h5>
                          </div>
                          <div className='orderSummaryDiv'>
                            {methods.length && methods.map((method, index) => (
                              <div className='finalCardDiv' key={index}>
                                <span><img src={mastercard} alt='mastercard'></img> {'  '} {method.cardType} Card</span>
                                <span>{method.cardNumber ? '*'.repeat(4) + ' ' + '*'.repeat(4) + ' ' + '*'.repeat(4) + ' ' + method.cardNumber.toString().slice(-4) : 'Card number not available'}</span>
                                <Row>
                                  <Col></Col>
                                  <Col>6/22</Col>
                                  <Col></Col>
                                  <Col>6/27</Col>
                                  <Col></Col>
                                </Row>
                              </div>
                            ))}
                          </div>
                          {stripeCardId && <div className='payNowBtn'>

                            <CustomButton
                              size='sm'
                              text='Pay Now'
                              className='payNowButton'
                              onClick={() => {
                                handlePayNow();
                                handleEmptyCart(userID);
                                // handleNotification({ userID });
                              }}
                            ></CustomButton>
                          </div>}
                        </>
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )

};
export default Checkout;


