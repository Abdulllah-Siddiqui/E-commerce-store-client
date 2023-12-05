/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import CustomCard from '../../../components/cards';
import Header from '../../../components/header';
import { Table } from 'react-bootstrap';
import arrows from '../../../assets/images/double-arrow.svg';
import { Badge } from 'react-bootstrap';
import PaginationComponent from '../../../components/pagintion';
import { fetchAllOrders } from '../../../redux/reducers/orderSlice';
import { fetchOrdersDetails } from '../../../redux/reducers/orderSlice';
import { updateOrdersAction } from '../../../redux/reducers/orderSlice';
import OffCanvasComponent from '../../../components/offcanvas';
import '../../../styles/index.css';
import CustomButton from '../../../components/buttons';

function AdminOrders() {

  const dispatch = useDispatch();

  // const orders = useSelector((state) => state.order.orders);
  const orders = useSelector((state) => state.order.sortedOrders);

  const { totalAmount, totalUnits, totalOrders, totalPages } = useSelector((state) => state.order);
  const prodStock = useSelector((state) => state.product.products[0].stock);


  const [page, setPage] = useState(1);
  const [showOrd, setShowOrd] = useState(false);
  const handleCloseOrd = () => setShowOrd(false);
  const handleShowOrd = () => setShowOrd(true);

  const [prodDetails, setProdDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);


  const handlePageChange = (num) => {
    setPage(num);
  }
  const handleDeliverButton = (orderID) => {
    dispatch(updateOrdersAction({ orderID })).then(() =>
      dispatch(fetchAllOrders())
    );
  }

  useEffect(() => {
    dispatch(fetchOrdersDetails());
    console.log('orders details', orderDetails)
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllOrders({ page }));
  }, [page]);

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
                <th>
                  Stock
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
                  <td>{prodStock || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </OffCanvasComponent>

      <div className='adminContainer'>
        <div className='adminSubContainer'>
          <div className='adminOrderCards'>
            <CustomCard
              superscript='Total Orders'
              t5={totalOrders ? totalOrders: 0}
            ></CustomCard>
            <CustomCard
              superscript='Total Units'
              t5={totalUnits ? totalUnits: 0}
            ></CustomCard>
            <CustomCard
              superscript='Total Amount'
              t5={`$${totalAmount ? totalAmount : 0}`}
            ></CustomCard>
          </div>
          <div className='adminHead'>
            <Header
              title='Orders'
            ></Header>
          </div>
          <Table hover  >
            <thead className='table-gradient'>
              <tr className='tableHeaderRow'>
                <th>
                  Date
                  {' '}
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>Order #</th>
                <th>
                  Users
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>
                  Product(s)
                  {' '}
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>
                  Amount
                  {' '}
                  <img src={arrows} alt='double-arrow'></img>
                </th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='tableBody'>
              {Array.isArray(orders) && orders.map((order, index) => (
                <tr className='productInfo' key={index}>
                  <td>{formatDate(order.date)}</td>
                  <td>{order._id ? order._id.slice(-6) : 'N/A'}</td>
                  <td>{order.userName}</td>
                  <td> {' '} {order.totalProducts}</td>
                  <td>{order.amount}</td>
                  <td><Badge bg='success'>{order.status}</Badge></td>
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
                    {' '}
                    <CustomButton
                      text={order.action === 'Delivered' ? 'Delivered' : 'Mark as Delivered'}
                      size='sm'
                      variant={order.action === 'Delivered' ? 'success' : 'light'}
                      onClick={() => handleDeliverButton(order._id)}

                    ></CustomButton></td>
                </tr>
              ))}
            </tbody>
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
</>
  );
};
export default AdminOrders;