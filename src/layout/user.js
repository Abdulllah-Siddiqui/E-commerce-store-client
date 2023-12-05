import React, { Children } from 'react';
import CustomNavbar from '../components/navbar';

const UserLayout = ({children}) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};
export default UserLayout;