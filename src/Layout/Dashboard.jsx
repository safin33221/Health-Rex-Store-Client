import React from 'react';
import { NavLink } from 'react-router-dom';
import useSeller from '../Hooks/useSeller';

const Dashboard = () => {
    const [isSeller] = useSeller()
    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-accent'>
                {
                    isSeller && <ul className='menu'>
                        <li><NavLink to='/dashborad'>Seller Home Page</NavLink></li>
                        <li><NavLink to='/dashborad/manageMedicines'>Manage Medicines</NavLink></li>
                        <li><NavLink to='/dashborad/paymentsHistory'>Payments History</NavLink></li>
                        <li><NavLink to='/dashborad/advertisement'>Ask For Advertisement</NavLink></li>
                    </ul>
                }
            </div>
            <div className='flex-1'>
                <h1>hey this i safin</h1>
            </div>

        </div>
    );
};

export default Dashboard;