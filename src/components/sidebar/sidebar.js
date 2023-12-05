/* eslint-disable react/no-unknown-property */
import React from 'react';
import {Sidebar,Menu, MenuItem} from 'react-pro-sidebar';
import '../../styles/index.css';
import arrow from '../../assets/images/right-arrow.svg'
import { Link } from 'react-router-dom';

function CustomSidebar({
        className='',
        onClick='',
        rootStyles=''


}){
    return(

    <Sidebar  className='sidebar' >
        <Menu className='menubar'>
            <MenuItem className='menuItem' > 
                 <div>  
                    <img src={arrow} alt='arrow'/> 
                    <Link to='/'>Dashboard</Link>
                </div>
            </MenuItem>
            <MenuItem className='menuItem'> 
                 <div>  
                    <img src={arrow} alt='arrow'/> 
                    <Link to='/admin'>Products</Link>
  

                </div>
            </MenuItem>
            <MenuItem className='menuItem'> 
                 <div>  
                    <img src={arrow} alt='arrow'/> 
                    <Link to='/admin-orders'>Orders</Link>

                </div>
            </MenuItem>
        </Menu>
    </Sidebar>
      
    );
};

export default CustomSidebar;