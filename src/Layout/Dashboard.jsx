import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import useRole from '../Hooks/useRole';
import { FaBars, FaChartLine, FaHome, FaUsersCog } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { FaShop } from 'react-icons/fa6';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoWalletSharp } from 'react-icons/io5';
import { FcSalesPerformance } from 'react-icons/fc';
import { MdManageHistory } from 'react-icons/md';
import useAuth from '../Hooks/useAuth';
import { CgProfile } from 'react-icons/cg';
import Swal from 'sweetalert2';


const Dashboard = () => {
    const [role] = useRole()
    const { toggleTheme, theme, sigoutUser } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        sigoutUser()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have been log out succefully",
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate('/')
            })
    }
    return (
        <div className='flex '>


            <div>
                <div className="drawer z-20   lg:hidden">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className=" text-xl  mx-3 fixed top-4 drawer-button"><FaBars /></label>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200  z-50 text-base-content h-full w-80 p-4">
                            {/* Sidebar content here */}
                            {
                                role === 'admin' && <ul className='menu '>
                                    <Helmet title="HRS | ADMIN DASHBOARD" />
                                    <h1 className='text-center font-bold text-2xl border-b-2 border-black my-5 '>Admin</h1>

                                    <li><NavLink to='/dashboard/adminHome'><FaHome /> Home</NavLink></li>
                                    <li><NavLink to='/dashboard/manageUsers'><FaUsersCog />
                                        Manage Users</NavLink></li>
                                    <li><NavLink to='/dashboard/manageCategory'> <BiCategoryAlt /> Manage Category</NavLink></li>
                                    <li><NavLink to='/dashboard/managePayments'><IoWalletSharp />Payment management</NavLink></li>
                                    <li><NavLink to='/dashboard/salesReport'> <FaChartLine className=' text-black' />Sales Report</NavLink></li>
                                    <li><NavLink to='/dashboard/manageAdvertise'> <MdManageHistory />Manage banner Advertise</NavLink></li>
                                </ul>
                            }
                            {
                                role === 'seller' && <ul className='menu'>
                                    <Helmet title="HRS | SELLER DASHBOARD" />
                                    <h1 className='text-center font-bold text-2xl border-b-2 border-black mb-4'>Seller</h1>
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

                {/* Desktop viwe */}
                <div className='w-64 min-h-full  fixed hidden lg:block shadow-2xl'>

                    {
                        role === 'admin' && <ul className='menu'>
                            <Helmet title="HRS | ADMIN DASHBOARD" />
                            <h1 className='text-center font-bold text-2xl border-b-2  my-5 '>Admin</h1>
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
                            <h1 className='text-center font-bold text-2xl border-b-2 border-black my-5'>Seller</h1>
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

                        <label onChange={toggleTheme}
                            className="swap swap-rotate mx-2  ">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" />

                            {/* sun icon */}

                            <svg
                                className="swap-off h-8 w-8 fill-current "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-8 w-8 fill-current "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                            <h1 className='ml-10 mt-2 font-bold'>{theme === 'forest' ? "Dark" : "Light"}</h1>
                        </label>
                        <li><NavLink to='/'><FaHome />Home </NavLink></li>
                        <li><NavLink to='/shop'><FaShop />Shop </NavLink></li>
                        <li><NavLink to='/dashboard/profile'><CgProfile /> Profile </NavLink></li>
                        <li><button className="btn btn-outline btn-sm my-2" onClick={handleLogout}>Logout</button></li>
                        {/* Theme Controlar */}

                        {/* Theme Controler */}

                    </ul>
                </div>
            </div>




            <div className='flex-1  lg:ml-48 overflow-x-auto px-3 mx-auto  '>
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;