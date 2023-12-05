import React from 'react';
import Header from '../../../components/header';
import arrows from '../../../assets/images/double-arrow.svg';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../styles/index.css';
import CustomCard from '../../../components/cards';
import { Chart } from "react-google-charts";
import { fetchDashboardStats } from '../../../redux/reducers/orderSlice';
import CustomLineChart from './App';
import cart from '../../../assets/images/shopping-cart.svg'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



function AdminDashboard() {

  const ordersPaid = useSelector((state) => state.order.dashboardStats[0]?.ordersPaid);
  const ordersUnPaid = useSelector((state) => state.order.dashboardStats[0]?.ordersUnPaid);

   const dData = [
    ["Order", "Total paid"],
    ["Orders Paid", ordersPaid],
    ["Orders Unpaid", ordersUnPaid]
  ];
  
   const dOptions = {
    pieHole: 0.6,
    is3D: false,
    colors: ['#5DDC6B', '#5366FF'],
    pieSliceTextStyle: {
      color: 'none',
    },
    legend: { position: "bottom" },
  };



  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const dashboardStats = useSelector((state) => state.order.dashboardStats);
  const todayStats = useSelector((state) => state.order.todayStats);
  const sevenDayStats = useSelector((state) => state.order.sevenDayStats);
  const thirtyDayStats = useSelector((state) => state.order.thirtyDayStats);
  const {topSellingProducts} = useSelector((state) => state.order);
 

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, []);


  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className='adminContainer'>
        <div className='adminSubContainer'>
          <div className='adminHead'>
            <Header
              title='Dashboard'
            />
          </div>
          <div className='adminCards'>

            <div className='adminCard'>
              <div>
                <h5><img src={cart} alt='cart'></img>
                {' '}
                Today</h5>
              </div>
              <div>
                <span>Total Products:{' '}
                  <span><strong>{(todayStats.length && todayStats[0].totalProducts) || 0}</strong></span>
                </span>
                <span>Total Orders:{' '}
                  <span><strong>{(todayStats.length && todayStats[0]?.totalOrders) || 0}</strong></span>
                </span>
              </div>
              <div>
                <span>Total Units:{' '}
                  <span><strong>{(todayStats.length && todayStats[0]?.totalUnits) || 0}</strong></span>
                </span>
                <span>Total Sales:{' '}
                  <span><strong>{Math.floor((todayStats.length && todayStats[0]?.totalSales) || 0)}</strong></span>
                </span>
              </div>
            </div>

            <div className='adminCard'>
              <div>
              <h5><img src={cart} alt='cart'></img>
                {' '}
                7 Days</h5>             
                 </div>
              <div>
                <span>Total Products:{' '}
                  <span><strong>{(sevenDayStats.length && sevenDayStats[0]?.totalProducts) || 0}</strong></span>
                </span>
                <span>Total Orders:{' '}
                  <span><strong>{(sevenDayStats.length && sevenDayStats[0]?.totalOrders) || 0}</strong></span>
                </span>
              </div>
              <div>
                <span>Total Units:{' '}
                  <span><strong>{(sevenDayStats.length && sevenDayStats[0]?.totalUnits) || 0}</strong></span>
                </span>
                <span>Total Sales:{' '}
                  <span><strong>{Math.floor((sevenDayStats.length && sevenDayStats[0]?.totalSales )|| 0)}</strong></span>
                </span>
              </div>
            </div>

            <div className='adminCard'>
              <div>
              <h5><img src={cart} alt='cart'></img>
                {' '}
                30 Days</h5>
              </div>
              <div>
                <span>Total Products:{' '}
                  <span><strong>{(thirtyDayStats.length && thirtyDayStats[0]?.totalProducts) || 0}</strong></span>
                </span>
                <span>Total Orders:{' '}
                  <span><strong>{(thirtyDayStats.length && thirtyDayStats[0]?.totalOrders) || 0}</strong></span>
                </span>
              </div>
              <div>
                <span>Total Units:{' '}
                  <span><strong>{(thirtyDayStats.length && thirtyDayStats[0]?.totalUnits) || 0}</strong></span>
                </span>
                <span>Total Sales:{' '}
                  <span><strong>{Math.floor((thirtyDayStats.length && thirtyDayStats[0]?.totalSales) || 0)}</strong></span>
                </span>
              </div>
            </div>

          </div>
          <div className='chartsDiv'>
            <div className='piechartDiv'>
              <Header
                subtitle='Orders Overview'
              ></Header>
              <div className='pieChart'>
                <Chart
                  chartType="PieChart"
                  width="320px"
                  height="330px"
                  data={dData}
                  options={dOptions}
                />
              </div>
            </div>
            <div className='lineChartDiv'>
              <Header
                subtitle='Sales & Orders Report'
              ></Header>
              <div className='lineChart'>
                <CustomLineChart />
              </div>
            </div>
          </div>
          <div className='adminTable'>
            <Header
              subtitle='Top selling Products'
            ></Header>
            <Table borderless hover  >
              <thead className='table-gradient'>
                <tr className='tableHeaderRow'>
                  <th>
                    Product
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>Stock</th>
                  <th>Units</th>
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
                </tr>
              </thead>
              <tbody className='tableBody'>
                {topSellingProducts?.map((top) => (
                  <tr className='productInfo' key={top._id}>
                    <td>
                      <img className='productIcon' src={top?.thumbnail || ''} alt='product-img' />
                      {' '}
                      {top?.title || ''}
                    </td>
                    <td>
                      {top?.stock || 0}
                    </td>
                    <td>
                      {`${top?.sold}(sold)` || 0}
                    </td>
                    <td>
                      {`$${top?.price}` || 0 }
                    </td>
                    <td>
                      {getCurrentDate()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
};
export default AdminDashboard;