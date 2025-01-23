import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import useRole from '../Hooks/useRole';
import { FaBars, FaHome, FaUsersCog } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { FaShop } from 'react-icons/fa6';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoWalletSharp } from 'react-icons/io5';
import { FcSalesPerformance } from 'react-icons/fc';
import { MdManageHistory } from 'react-icons/md';

const Dashboard = () => {
    const [role] = useRole()

    return (
        <div className='flex '>
            <div className="drawer z-20   lg:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className=" btn-primary text-2xl fixed top-10 text-black ml-8 drawer-button"><FaBars/></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-primary z-50 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        {
                            role === 'admin' && <ul className='menu'>
                                <Helmet title="HRS | ADMIN DASHBOARD" />
                                <h1 className='text-center font-bold text-2xl border-b-2 border-black my-5 '>Admin</h1>
                                <li><NavLink to='/dashboard/adminHome'><FaHome /> Home</NavLink></li>
                                <li><NavLink to='/dashboard/manageUsers'><FaUsersCog />
                                    Manage Users</NavLink></li>
                                <li><NavLink to='/dashboard/manageCategory'> <BiCategoryAlt /> Manage Category</NavLink></li>
                                <li><NavLink to='/dashboard/managePayments'><IoWalletSharp />Payment management</NavLink></li>
                                <li><NavLink to='/dashboard/salesReport'> <FcSalesPerformance className=' text-black' />Sales Report</NavLink></li>
                                <li><NavLink to='/dashboard/manageAdvertise'> <MdManageHistory />Manage banner Advertise</NavLink></li>
                            </ul>
                        }
                        {
                            role === 'seller' && <ul className='menu'>
                                <Helmet title="HRS | SELLER DASHBOARD" />
                                <h1 className='text-center font-bold text-2xl border-b-2 border-black'>Seller</h1>
                                <li><NavLink to='/dashboard/sellerHome'>Home </NavLink></li>
                                <li><NavLink to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                                <li><NavLink to='/dashboard/paymentsHistory'>Payments History</NavLink></li>
                                <li><NavLink to='/dashboard/askForAd'>Ask For Advertisement</NavLink></li>
                            </ul>
                        }
                        {
                            role === 'user' && <ul className='menu'>

                                <Helmet title="HRS | USER DASHBOARD" />
                                <h1 className='text-center font-bold text-2xl border-b-2 my-5 border-black'>User</h1>


                                <li><NavLink to='/dashboard/userPayments'>Payments History</NavLink></li>

                            </ul>
                        }

                        <div className="divider"></div>

                        <ul className='menu'>

                            <li><NavLink to='/'><FaHome />Home </NavLink></li>
                            <li><NavLink to='/shop'><FaShop />Shop </NavLink></li>

                        </ul>
                    </ul>
                </div>
            </div>
            <div className='w-64 min-h-full bg-primary fixed hidden lg:block'>

                {
                    role === 'admin' && <ul className='menu'>
                        <Helmet title="HRS | ADMIN DASHBOARD" />
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black my-5 '>Admin</h1>
                        <li><NavLink to='/dashboard/adminHome'><FaHome /> Home</NavLink></li>
                        <li><NavLink to='/dashboard/manageUsers'><FaUsersCog />
                            Manage Users</NavLink></li>
                        <li><NavLink to='/dashboard/manageCategory'> <BiCategoryAlt /> Manage Category</NavLink></li>
                        <li><NavLink to='/dashboard/managePayments'><IoWalletSharp />Payment management</NavLink></li>
                        <li><NavLink to='/dashboard/salesReport'> <FcSalesPerformance className=' text-black' />Sales Report</NavLink></li>
                        <li><NavLink to='/dashboard/manageAdvertise'> <MdManageHistory />Manage banner Advertise</NavLink></li>
                    </ul>
                }
                {
                    role === 'seller' && <ul className='menu'>
                        <Helmet title="HRS | SELLER DASHBOARD" />
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black'>Seller</h1>
                        <li><NavLink to='/dashboard/sellerHome'>Home </NavLink></li>
                        <li><NavLink to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                        <li><NavLink to='/dashboard/paymentsHistory'>Payments History</NavLink></li>
                        <li><NavLink to='/dashboard/askForAd'>Ask For Advertisement</NavLink></li>
                    </ul>
                }
                {
                    role === 'user' && <ul className='menu'>

                        <Helmet title="HRS | USER DASHBOARD" />
                        <h1 className='text-center font-bold text-2xl border-b-2 my-5 border-black'>User</h1>


                        <li><NavLink to='/dashboard/userPayments'>Payments History</NavLink></li>

                    </ul>
                }

                <div className="divider"></div>

                <ul className='menu'>

                    <li><NavLink to='/'><FaHome />Home </NavLink></li>
                    <li><NavLink to='/shop'><FaShop />Shop </NavLink></li>

                </ul>
            </div>
            <div className='flex-1  lg:ml-48 '>
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;