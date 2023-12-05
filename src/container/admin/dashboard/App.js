import React, { useEffect, useState } from 'react'; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer
} from 'recharts';

// import YearPicker from './YearPicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../../redux/reducers/orderSlice';


const initialData = [
    { name: 1, Sales: 411, Orders: 3000 },
    { name: 2, Sales: 2239, Orders: 1120 },
    { name: 3, Sales: 1137, Orders: 450 },
    { name: 4, Sales: 1616, Orders: 3080 },
    { name: 5, Sales: 2729, Orders: 4500 },
    { name: 6, Sales: 3234, Orders: 1490 },
    { name: 7, Sales: 1253, Orders: 2050 },
    { name: 8, Sales: 2652, Orders: 1100 },
    { name: 9, Sales: 1979, Orders: 2000 },
    { name: 10, Sales: 2894, Orders: 2227 },
    { name: 11, Sales: 4031, Orders: 2100 },
    { name: 12, Sales: 4431, Orders: 3400 },
  ];

  const initialState = {
    data: initialData,
    left: 0,
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 0,
    top2: 2000,
    bottom2: 0,
    animation: true
};
const getAxisYDomain = (from, to, ref, offset) => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });
  return [Math.floor(bottom) - offset, Math.ceil(top) + offset];
};
// const initialState = {
//   data: initialData,
//   left: 0, // Change the left Y-axis value to 0
//   right: 'dataMax',
//   refAreaLeft: '',
//   refAreaRight: '',
//   top: 'dataMax+1',
//   bottom: 0, // Change the Y-axis min value to 0
//   top2: 2000, // Set the Y-axis max value to 5000
//   bottom2: 0, // Change the Y-axis min value to 0
//   animation: true,
// };

function CustomLineChart() {
  const [state, setState] = useState({ data: [] });
  const dashboardStats = useSelector((state) => state.order.dashboardStats);
  const statsOfYear = useSelector((state) => state.order.statsOfYear);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardStats());
    console.log('Sales and report allStats', statsOfYear);
}, []);

useEffect(() => {
  if (statsOfYear) {
      const updatedData = statsOfYear.map((item) => ({
          name: item.month,
          Sales: item.totalSales,
          Orders: item.totalOrders
      }));
      setState({ ...state, data: updatedData });
  }
}, [statsOfYear]);

  // const zoom = () => {
  //   let { refAreaLeft, refAreaRight } = state;
  //   const { data } = state;
  //   if (refAreaLeft === refAreaRight || refAreaRight === '') {
  //     setState({
  //       ...state,
  //       refAreaLeft: '',
  //       refAreaRight: '',
  //     });
  //     return;
  //   }
  //   // xAxis domain
  //   if (refAreaLeft > refAreaRight)
  //     [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
  //   // yAxis domain
  //   const [bottom, top] = getAxisYDomain(
  //     refAreaLeft,
  //     refAreaRight,
  //     'Sales',
  //     1
  //   );
  //   const [bottom2, top2] = getAxisYDomain(
  //     refAreaLeft,
  //     refAreaRight,
  //     'Orders',
  //     50
  //   );
  //   setState({
  //     ...state,
  //     refAreaLeft: '',
  //     refAreaRight: '',
  //     data: data.slice(),
  //     left: refAreaLeft,
  //     right: refAreaRight,
  //     bottom,
  //     top,
  //     bottom2,
  //     top2,
  //   });
  // };
  return (
    <div className="highlight-bar-charts" style={{ userSelect: 'none', marginTop: '70px' }}>
        <div className="custom-legend">
            <div className='order-Unpaid'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g filter="url(#filter0_d_1295_22424)">
                        <circle cx="10" cy="8" r="5" fill="#007BFF" />
                        <circle cx="10" cy="8" r="5" stroke="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_1295_22424" x="0.5" y="0.5" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1295_22424" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1295_22424" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <span className='order' style={{ marginLeft: '10px' }}>Sales</span>
            </div>
            <div className='order-paid'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g filter="url(#filter0_d_1295_22424)">
                        <circle cx="10" cy="8" r="5" fill="#E65600" />
                        <circle cx="10" cy="8" r="5" stroke="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_1295_22424" x="0.5" y="0.5" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1295_22424" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1295_22424" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <span className='order' style={{ marginLeft: '10px' }}>Orders</span>
            </div>
            {/* <div className="date">
                <p className='date-header'>Date:</p>
                <div className="date-picker">
                     <YearPicker onYearChange={handleYearChange} />
                </div>
            </div> */}
        </div>
          <div className='highlight-bar-charts' style={{ userSelect: 'none' }}>

        {/* <ResponsiveContainer width="1000px" aspect={9}> */}
            <LineChart
                width={700}
                height={200}
                data={state.data}
                onMouseDown={(e) => setState({ ...state, refAreaLeft: e.activeLabel })}
                onMouseMove={(e) =>
                    state.refAreaLeft &&
                    setState({ ...state, refAreaRight: e.activeLabel })
                }
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    allowDataOverflow
                    dataKey="name"
                    domain={[state.left, state.right]}
                    type="number"
                    tick={{ fontSize: 12 }}
                    ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    tickFormatter={(value) => {
                        const monthNames = [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ];
                        return monthNames[value - 1];
                    }}
                />
                <YAxis
                    allowDataOverflow
                    domain={[state.bottom, state.top]}
                    type="number"
                    yAxisId="1"
                    tick={{ fontSize: 12 }}
                    ticks={[1000, 10000, 50000, 75000, 100000, 125000]}
                    tickFormatter={(value) => `$${value}`}
                />
                <YAxis
                    orientation="right"
                    allowDataOverflow
                    domain={[state.bottom2, state.top2]}
                    type="number"
                    yAxisId="2"
                    tick={{ fontSize: 12 }}
                    ticks={[0, 1, 25, 50, 75, 100]}
                />
                <Tooltip />
                <Line
                    yAxisId="1"
                    type="natural"
                    dataKey="Sales"
                    stroke="#007BFF"
                    animationBegin={0}
                    animationDuration={1000}
                />
                <Line
                    yAxisId="2"
                    type="natural"
                    dataKey="Orders"
                    stroke="#E65600"
                    animationBegin={0}
                    animationDuration={1000}
                />

                {state.refAreaLeft && state.refAreaRight ? (
                    <ReferenceArea
                        yAxisId="1"
                        x1={state.refAreaLeft}
                        x2={state.refAreaRight}
                        strokeOpacity={0.3}
                    />
                ) : null}
            </LineChart>
        {/* </ResponsiveContainer> */}
       </div>
    </div>
);

  // return (
  //   <div className='highlight-bar-charts' style={{ userSelect: 'none', paddingTop: '40px' }}>
  //     <LineChart
  //       width={700}
  //       height={280}
  //       data={state.data}
  //       onMouseDown={(e) => setState({ ...state, refAreaLeft: e.activeLabel })}
  //       onMouseMove={(e) =>
  //         state.refAreaLeft &&
  //         setState({ ...state, refAreaRight: e.activeLabel })
  //       }
  //       // onMouseUp={zoom}
  //     >
  //       <CartesianGrid strokeDasharray='3 3' />
  //       <XAxis
  //         allowDataOverflow
  //         dataKey='name'
  //         domain={[state.left, state.right]}
  //         type='number'
  //         tick={{ fontSize: 12 }} // Set font size for X-axis labels
  //         ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} // Customize X-axis ticks to represent months
  //         tickFormatter={(value) => {
  //           // Convert numeric month to string (e.g., 1 -> ‘Jan’)
  //           const monthNames = [
  //             'Jan',
  //             'Feb',
  //             'Mar',
  //             'Apr',
  //             'May',
  //             'Jun',
  //             'Jul',
  //             'Aug',
  //             'Sep',
  //             'Oct',
  //             'Nov',
  //             'Dec',
  //           ];
  //           return monthNames[value - 1];
  //         }}
  //       />
  //       <YAxis
  //         allowDataOverflow
  //         domain={[state.bottom, state.top]}
  //         type='number'
  //         yAxisId='1'
  //         tick={{ fontSize: 12 }} // Set font size for Y-axis labels
  //         ticks={[0, 1000, 2000, 3000, 4000, 5000]} // Customize Y-axis ticks
  //         tickFormatter={(value) => `$${value}`} // Format Y-axis labels with ‘$’
  //       />
  //       <YAxis
  //         orientation='right'
  //         allowDataOverflow
  //         domain={[state.bottom2, state.top2]}
  //         type='number'
  //         yAxisId='2'
  //         tick={{ fontSize: 12 }} // Set font size for Y-axis labels
  //       />
  //       <Tooltip />
  //       <Line
  //         yAxisId='1'
  //         type='natural'
  //         dataKey='Sales'
  //         stroke='#E75600'
  //         animationBegin={0}
  //         animationDuration={2000}
  //       />
  //       <Line
  //         yAxisId='2'
  //         type='natural'
  //         dataKey='Orders'
  //         stroke='#007BFF'
  //         animationBegin={0}
  //         animationDuration={2000}
  //       />
  //       {state.refAreaLeft && state.refAreaRight ? (
  //         <ReferenceArea
  //           yAxisId='1'
  //           x1={state.refAreaLeft}
  //           x2={state.refAreaRight}
  //           strokeOpacity={0.3}
  //         />
  //       ) : null}
  //     </LineChart>
  //   </div>
  // );
}
export default CustomLineChart;