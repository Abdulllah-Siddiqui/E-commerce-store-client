/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders } from '../../../redux/reducers/orderSlice';
import Header from '../../../components/header';
import { Table } from 'react-bootstrap';
import arrows from '../../../assets/images/double-arrow.svg';
import { Badge } from 'react-bootstrap';
import CustomButton from '../../../components/buttons';
import OffCanvasComponent from '../../../components/offcanvas';
import PaginationComponent from '../../../components/pagintion';
import '../../../styles/index.css';
import { current } from '@reduxjs/toolkit';

function UserOrders() {

  const dispatch = useDispatch();

  const userID = useSelector((state) => state.auth.user._id);
  const orders = useSelector((state) => state.order.orders);
  const totalPages = useSelector((state) => state.product.totalPages);

  const [page, setPage] = useState(1);
  const [prodDetails, setProdDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showOrd, setShowOrd] = useState(false);
  const handleCloseOrd = () => setShowOrd(false);
  const handleShowOrd = () => setShowOrd(true);


  const handlePageChange = (num) => {
    setPage(num);
  }

  useEffect(() => {
    dispatch(fetchOrders({ userID, page }));
  }, [userID, page]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <>
      <OffCanvasComponent
        name='Order Details'
        show={showOrd}
        handleClose={handleCloseOrd}
        className='Canvas w-75'
      >
        <div>
          <div className='orderDetailsSection'>
            <div>
              <p>Date</p>
              <span>{orderDetails.date ? formatDate(orderDetails.date):'--/--/--'}</span>
            </div>
            <div>
              <p>Order #</p>
              <span>{orderDetails._id ? orderDetails._id.slice(-6) : 'N/A'}</span>
            </div>
            <div>
              <p>User</p>
              <span>{orderDetails.userName ? orderDetails.userName : 0}</span>
            </div>
            <div>
              <p>Products</p>
              <span>{orderDetails.totalProducts}</span>
            </div>
            <div>
              <p>Amount</p>
              <span>{`$ ${orderDetails.amount}`}</span>
            </div>
          </div>
          <div className='orderDetailsSubHeading'>
            <p>Product Information</p>
          </div>
          <Table hover  >
            <thead className='table-gradient'>
              <tr className='tableHeaderRow'>
                <th>
                  Title
                  {' '}
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>Brand </th>
                <th>
                  Price
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>
                  Rating
                  {' '}
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>
                  Quantity
                  {' '}
                  <img src={arrows} alt='double-arrow'></img>
                </th>
              </tr>
            </thead>
            <tbody className='tableBody'>
              {Array.isArray(prodDetails) && prodDetails.map((prod, index) => (
                <tr className='productInfo' key={index}>
                  <td><img className='ordersDetailsImg'src={prod.thumbnail || prod.images[0]} alt='img'></img>{' '}{prod.title}</td>
                  <td>{prod.brand || 'N/A'}</td>
                  <td>{prod.price || 'N/A'}</td>
                  <td>{prod.rating || 'N/A'}</td>
                  <td>{prod.quantity || 'N/A'}</td>                  
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </OffCanvasComponent>
      <div className='userContainer'>
        <div style={{ backgroundColor: '#F8F9FA' }}>
          <div className='userOrdersHead'>
            <Header
              title='Orders'
            ></Header>
          </div>
          <div className='userOrdersContainer'>
            <Table hover >
              <thead className='table-gradient'>
                <tr>
                  <th>
                    Order#
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>
                    Name
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>
                    Products
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Amount
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>
                    Date
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              {
                orders === [] ?(
                  null
                ):
              <tbody className='tableBody'>
                {Array.isArray(orders.orders) && orders.orders?.map((order, index) => (
                  <tr className='productInfo' key={index}>
                    <td>{order._id ? order._id.slice(-6) : 'N/A'}</td>
                    <td>{order.userName}</td>
                    <td> {' '} {order.totalProducts}</td>
                    <td><Badge bg='success'>{order.status}</Badge></td>
                    <td>{order.amount}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>
                    <CustomButton
                      text='&#8599;'
                      size='sm'
                      variant='outline-secondary'
                      onClick={()=>{
                        handleShowOrd()
                        setProdDetails(order.productDetails);
                        setOrderDetails(order);
                      }}
                    ></CustomButton>
                    </td>
                  </tr>

                ))}
              </tbody>
              }

            </Table>
            <div>
              <PaginationComponent
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />

            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default UserOrders;