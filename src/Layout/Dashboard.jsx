import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import useRole from '../Hooks/useRole';
import { FaHome } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const [role] = useRole()

    return (
        <div className='flex '>
            <div className='w-64 min-h-screen bg-primary fixed '>

                {
                    role === 'admin' && <ul className='menu'>
                        <Helmet title="HRS | ADMIN DASHBOARD"/>
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black my-5 '>Admin</h1>
                        <li><NavLink to='/dashboard/adminHome'>Home</NavLink></li>
                        <li><NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                        <li><NavLink to='/dashboard/manageCategory'>Manage Category</NavLink></li>
                        <li><NavLink to='/dashboard/managePayments'>Payment management</NavLink></li>
                        <li><NavLink to='/dashboard/salesReport'>Sales Report</NavLink></li>
                        <li><NavLink to='/dashboard/manageAdvertise'>Manage banner Advertise</NavLink></li>
                    </ul>
                }
                {
                    role === 'seller' && <ul className='menu'>
                        <Helmet title="HRS | SELLER DASHBOARD"/>
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black'>Seller</h1>
                        <li><NavLink to='/dashboard/sellerHome'>Home </NavLink></li>
                        <li><NavLink to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                        <li><NavLink to='/dashboard/paymentsHistory'>Payments History</NavLink></li>
                        <li><NavLink to='/dashboard/askForAd'>Ask For Advertisement</NavLink></li>
                    </ul>
                }
                {
                    role === 'user' && <ul className='menu'>
                        <Helmet title="HRS | USER DAHSBOARD"/>
                        <Helmet title="HRS | USER DASHBOARD"/>
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black'>User</h1>
                        <li><NavLink to='/dashboard/userHome'>Home </NavLink></li>
                        
                        <li><NavLink to='/dashboard/paymentsHistory'>Payments History</NavLink></li>
                       
                    </ul>
                }

                <div className="divider"></div>

                <ul className='menu'>
                    
                    <li><NavLink to='/'><FaHome/>Home </NavLink></li>
                    
                </ul>
            </div>
            <div className='flex-1 ml-48'>
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;