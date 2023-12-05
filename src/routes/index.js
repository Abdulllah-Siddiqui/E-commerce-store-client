import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AdminLayout, CommonLayout, UserLayout } from "../layout";
import Login from "../container/auth/login";
import Signup from "../container/auth/signup";
import ForgotPassword from "../container/auth/forgotPassword";
import CheckEmail from "../container/auth/checkEmail";
import ResetSuccessful from "../container/auth/resetSuccessful";
import ResetPassword from "../container/auth/resetPassword";
import AdminDashboard from "../container/admin/dashboard";
import AdminProducts from "../container/admin/products";
import AdminOrders from "../container/admin/orders";
import UserHome from '../container/user/home';
import ShoppingBag from '../container/user/shopping-bag';
import Checkout from "../container/user/checkout";
import UserOrders from "../container/user/orders";
import VerifyUser from "../container/auth/verifyUser";

import '../styles/index.css'
// const LazyUserHome = React.lazy(() => import("../container/user/home"));

const AllRoutes = () => {

    const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
    if (isLoggedIn) {
        if (isAdmin) {
            return (
                <AdminLayout>
                    <Routes>
                        <Route path='/admin' element={<AdminProducts />}></Route>
                        <Route path='/' element={<AdminDashboard />}></Route>
                        <Route path='/admin-orders' element={<AdminOrders />}></Route>
                    </Routes>
                </AdminLayout>
            );
        } else {
            console.log('Yes user');
            return (
                <UserLayout>
                    <Routes>
                        <Route path='/' element={<UserHome />}></Route>
                        <Route path='/shopping-bag' element={<ShoppingBag />}></Route>
                        <Route path='/user-orders' element={<UserOrders />}></Route>
                        <Route path='/checkout' element={<Checkout />}></Route>
                        <Route path='/shopping-bag' element={<ShoppingBag />}></Route>
                    </Routes>
                </UserLayout>
            );
        }
    } else {
        console.log('Without Login')
        return (
            <>
                <CommonLayout>
                    <Routes>
                     
                        <Route path='/' element={<UserHome />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/signup' element={<Signup />}></Route>
                        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                        <Route path='/reset-password' element={<ResetPassword />}></Route>
                        <Route path='/check-email' element={<CheckEmail />}></Route>
                        <Route path='/reset-successful' element={<ResetSuccessful />}></Route>
                        <Route path='/verify-user' element={<VerifyUser />}></Route>
                    </Routes>

                </CommonLayout>
            </>
        );
    }
};




export default AllRoutes;
