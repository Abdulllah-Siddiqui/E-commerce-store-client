/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { incrementCartItemQuantity, decrementCartItemQuantity } from '../../../redux/reducers/cartSlice';
import { updateQuantity } from '../../../redux/reducers/cartSlice';
import { deleteCartItem } from '../../../redux/reducers/cartSlice';
import { fetchUserCart } from '../../../redux/reducers/cartSlice';
import { emptyCart } from '../../../redux/reducers/cartSlice';
import { nullCart } from '../../../redux/reducers/cartSlice';
import { Row, Col } from 'react-bootstrap';
import Header from '../../../components/header';
import deleteIcon from '../../../assets/images/trash-can.svg';
import whiteDelete from '../../../assets/images/white-trash.svg';
import CustomButton from '../../../components/buttons';
import CheckboxField from '../../../components/checks';

const ShoppingBag = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [disableCheckout, setDisableCheckout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector((state) => state.auth.user._id);
  const cartItems = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart.cartLength);
  const { cartEmpty } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(null);
  const [totalTax, setTotalTax] = useState(null);
  const [finalTotal, setFinalTotal] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleDeleteItem = (cartID) => {
    dispatch(deleteCartItem({ cartID }));
  };

  const handleEmptyCart = (userID) => {
    console.log(userID);
    dispatch(emptyCart({ userID }));
    dispatch(nullCart());
  }

  const handleAddProductBtn = () => {
    navigate('/');

  }

  const handleCheckoutBtn = () => {
    navigate('/checkout');
  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
   
  };
  useEffect(() => {
    dispatch(fetchUserCart(userID));
    console.log(cartItems)
  }, []);


  useEffect(() => {
    let totalItems = 0;
    let calculatedSubTotal = 0;

    for (const item of cartItems) {
      totalItems += item.quantity;
      calculatedSubTotal += item.price * item.quantity;
    }
    const calculatedTotalTax = calculatedSubTotal * 0.02;
    const calculatedFinalTotal = calculatedSubTotal + calculatedTotalTax;

    setSubTotal(parseFloat(calculatedSubTotal.toFixed(2)));
    setTotalTax(parseFloat(calculatedTotalTax.toFixed(2)));
    setFinalTotal(parseFloat(calculatedFinalTotal.toFixed(2)));

  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchUserCart(userID));
  }, [refresh])

  const changeQuantity = async (itemID, key) => {
    await dispatch(updateQuantity({ itemID, key })).then(() => {
      dispatch(fetchUserCart(userID))
    })
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
            <div className='shoppingBagHeader'>
              <Header
                title='Shopping Bag'
              ></Header>
            </div>
            <div>
              <div className='shoppingBagContainer'>
                <div className='shoppingBagLeftContainer'>
                  <Col xs={12} md={8} >
                    <div className='cartItemDiv'>
                      <input type="checkbox" checked={isChecked} onChange={handleCheck}  />
                      {`Selected (${cart}) items`}
                      <button
                        className='deleteCartBtn'
                        onClick={() => handleEmptyCart(userID)}>
                        <img src={isChecked? deleteIcon : whiteDelete} alt='trash-can'></img>
                      </button>
                    </div>
                    {cartItems?.length && cartItems.map((item, index) => (
                      <div className='cartItemDiv' key={index}>
                        <div className='cartItemLeftDiv'>
                          <div>
                            <img className='cartImg' src={item.thumbnail} alt='img'></img>
                          </div>
                          <Row>
                            <span>{item.description}</span>
                            <br></br>
                            <div className='cartDetailsDiv d-flex' >
                              <span className='d-flex' ><div className='cartColor' style={{ backgroundColor: item.colour }}></div> {item.colour}</span>
                              <span>Size: {item.size}</span>
                              <span style={{ color: '#007BFF' }}> {`Price: $${item.price}`}</span>
                            </div>
                            <Col></Col>
                          </Row>
                        </div>
                        <div className='cartItemRightDiv'>
                          <button
                            className='deleteCartBtn'
                            onClick={() => {
                              handleDeleteItem(item._id)
                            }}>
                            <img src={deleteIcon} alt='trash-can'></img>
                          </button>
                          <div className="quantityCount">
                            {item.quantity >= 1 ? (
                              <button
                                onClick={() => {
                                  changeQuantity(item._id, 0)
                                }}
                              >-</button>) :
                              <button onClick={() => setDisableCheckout(true)}>-</button>

                            }
                            <div>{item.quantity}</div>
                            <button
                              onClick={() => {
                                changeQuantity(item._id, 1)
                                setDisableCheckout(false)

                              }}
                            >+</button>
                          </div>
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
                      <span>{subTotal}</span>
                    </div>
                    <div className='orderSummaryContent'>
                      <span>Tax:</span>
                      <span>{totalTax}</span>
                    </div>
                    <div className='orderSummaryContent'>
                      <span>Total:</span>
                      <span>{finalTotal}</span>
                    </div>
                    <br></br>
                    <CustomButton
                      text='Proceed to Checkout'
                      size='lg'
                      className='orderSummaryBtn'
                      disabled={disableCheckout === true ? true : false}

                      onClick={() => { handleCheckoutBtn() }}
                    ></CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )

};
export default ShoppingBag;


