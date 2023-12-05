import React from 'react';
import CustomNavbar from '../components/navbar';
import CustomSidebar from '../components/sidebar/sidebar';

const AdminLayout = ({children}) => {
    return(
        <>
            <CustomNavbar />
            <div className='layoutDiv'>

            <CustomSidebar />
            {children}
            </div>
        </>

    );
};
export default AdminLayout;