import React, { Children } from 'react';
import CustomNavbar from '../components/navbar';

const CommonLayout = ({children}) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};
export default CommonLayout;