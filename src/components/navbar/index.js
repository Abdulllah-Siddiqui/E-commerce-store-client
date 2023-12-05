/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';

import { Dropdown, DropdownButton, Badge } from 'react-bootstrap';

import { Navbar } from 'react-bootstrap';

import CustomButton from '../buttons';
import CustomDropdown from '../split-dropdown';
import demoUserImg from '../../assets/images/green-tick.svg'

import { logout } from '../../redux/reducers/authSlice';
import { nullCart } from '../../redux/reducers/cartSlice';
import { fetchNotifications } from '../../redux/reducers/notificationSlice';
import { markaAsRead } from '../../redux/reducers/notificationSlice';
import { resetOrders } from '../../redux/reducers/orderSlice';
import bellSvg from '../../assets/images/Bell.svg'
import '../../styles/index.css'

function CustomNavbar({
    expand = "",
    variant = "",
    fixed = "",
    sticky = "",
    className = "",
    onToggle = ""
}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
    let orders = useSelector((state) => state.order.orders);
    const name = window.localStorage.getItem('name');
    const userImg = window.localStorage.getItem('userImg');
    const userID = useSelector((state) => state.auth.user._id);
    const cart = useSelector((state) => state.cart.items.length);
    const { notifications } = useSelector((state) => state.notification);
    const  notificationLength  = useSelector((state) => state.notification.notifications.length);

    useEffect(() => {
        dispatch(fetchNotifications(userID));
    }, [notificationLength, cart])
    
    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(resetOrders());
        dispatch(nullCart());
        navigate('/');
        console.log('orders after logout', orders);
    }
    const handleMarkAsRead = (notificationId) => {
        console.log('notification._id:', notificationId);
        dispatch(markaAsRead(notificationId));
    }
    const handleLogin = async () => {
        // await dispatch(logout());
        navigate('/login');
    }
    const handleOrders = () => {
        navigate('/user-orders');
    }
    const handleShoppingBag = () => {
        navigate('/shopping-bag');
    }
    return (
        <>
            <Navbar expand="lg" className="navbar" style={{ backgroundColor: '#ffffff' }}>
                <Container>
                    <Navbar.Brand className='navbarTag' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>E-commerce</Navbar.Brand>
                </Container>
                <Container className='innerContainer' fluid="false">

                    {isLoggedIn && !isAdmin ? (
                        <Col xs={3} style={{ cursor: 'pointer' }} onClick={handleShoppingBag} >
                            {cart > 0 ?
                                (
                                    <div className=''>
                                        <Badge as="div" bsPrefix="countBadge" pill bg="danger" text="light">{cart}</Badge>
                                    </div>) : null}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5H2V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H13C13.2652 15 13.5196 14.8946 13.7071 14.7071C13.8946 14.5196 14 14.2652 14 14V5ZM1 4V14C1 14.5304 1.21071 15.0391 1.58579 15.4142C1.96086 15.7893 2.46957 16 3 16H13C13.5304 16 14.0391 15.7893 14.4142 15.4142C14.7893 15.0391 15 14.5304 15 14V4H1Z" fill="#007BFF" />
                                <path d="M8 1.5C7.33696 1.5 6.70107 1.76339 6.23223 2.23223C5.76339 2.70107 5.5 3.33696 5.5 4H4.5C4.5 3.07174 4.86875 2.1815 5.52513 1.52513C6.1815 0.868749 7.07174 0.5 8 0.5C8.92826 0.5 9.8185 0.868749 10.4749 1.52513C11.1313 2.1815 11.5 3.07174 11.5 4H10.5C10.5 3.33696 10.2366 2.70107 9.76777 2.23223C9.29893 1.76339 8.66304 1.5 8 1.5Z" fill="#007BFF" />
                            </svg>
                        </Col>) : null}

                    {
                        isLoggedIn ? (
                            <Col xs={3} >
                                <div className='notificationsButton'>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="outline-light"
                                            id="dropdown-button-drop-start"
                                        >
                                            {notificationLength > 0 ?
                                                (
                                                    <div className=''>
                                                        <Badge as="div" bsPrefix="countBadge" pill bg="danger" text="light">{notificationLength}</Badge>
                                                    </div>) : null}
                                            <img className="bellSvg" src={bellSvg} alt='bell' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu id='notificationsMenu'>
                                        {notificationLength > 0 ?
                                        (
                                            notifications?.map((notification) => (
                                                <Dropdown.Item key={notification._id}>
                                                    <CustomButton
                                                        text="&#9989;"
                                                        size='sm'
                                                        variant="primary"
                                                        // as="div"
                                                        bsPrefix='markAsReadTick'
                                                        id='markAsReadButton'
                                                        onClick={() => handleMarkAsRead(notification._id)}
                                                        ></CustomButton>
                                                    {notification.body}
                                                    <Dropdown.Divider />
                                                </Dropdown.Item>
                                            ))
                                        ): 'No Notifications Available'}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        ) : null}
                    <Col xs={12}>
                        {
                            isLoggedIn ? (
                                <div>
                                    <CustomDropdown
                                        placeholder={name}
                                        onClick={handleLogout}
                                        onClick2={handleOrders}
                                    >
                                    </CustomDropdown>
                                    <img className='userImg' src={userImg ? userImg : demoUserImg} alt={'img'} />
                                </div>)
                                : (
                                    <>
                                        <CustomButton
                                            className='navbarLoginBtn'
                                            variant='outline-primary'
                                            text='Login'
                                            size='sm'
                                            onClick={handleLogin}
                                        ></CustomButton>
                                    </>
                                )
                        }
                    </Col>
                </Container>
            </Navbar>
        </>
    );
};

export default CustomNavbar;