import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import useRole from '../Hooks/useRole';

const Dashboard = () => {
    const [role] =useRole()
    
    return (
        <div className='flex '>
            <div className='w-64 min-h-screen bg-primary fixed '>

                {
                    role === 'admin' && <ul className='menu'>
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black '>Admin</h1>
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
                        <h1 className='text-center font-bold text-2xl border-b-2 border-black'>Seller</h1>
                        <li><NavLink to='/dashboard/sellerHome'>Home </NavLink></li>
                        <li><NavLink to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                        <li><NavLink to='/dashboard/paymentsHistory'>Payments History</NavLink></li>
                        <li><NavLink to='/dashboard/advertisement'>Ask For Advertisement</NavLink></li>
                    </ul>
                }
            </div>
            <div className='flex-1 ml-48'>
                <Outlet />
            </div>

        </div>
    );
};

export default Dashboard;