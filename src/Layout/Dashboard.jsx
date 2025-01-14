import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useSeller from '../Hooks/useSeller';

const Dashboard = () => {
    const [isSeller] = useSeller()
    return (
        <div className='flex '>
            <div className='w-64 min-h-screen bg-primary fixed '>
                {
                    isSeller && <ul className='menu'>
                        <li><NavLink to='/dashboard/sellerHome'>Seller Home Page</NavLink></li>
                        <li><NavLink to='/dashboard/manageMedicines'>Manage Medicines</NavLink></li>
                        <li><NavLink to='/dashboard/paymentsHistory'>Payments History</NavLink></li>
                        <li><NavLink to='/dashboard/advertisement'>Ask For Advertisement</NavLink></li>
                    </ul>
                }
            </div>
            <div className='flex-1 ml-48'>
               <Outlet/>
            </div>

        </div>
    );
};

export default Dashboard;