import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'

import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const { user, sigoutUser, carts } = useAuth()
    const navigate = useNavigate()
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/shop'>Shop</NavLink></li>
        <li>
            <select name="language" className="select    w-full min-w-28 focus:outline-none bg-transparent">

                <option defaultValue value="english"> English</option>
                <option value="bangla">Bangla</option>

            </select>
        </li>
    </>
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
        <div className="navbar bg-primary md:px-16 fixed top-0 z-50 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        {
                            links
                        }
                    </ul>
                </div>
                <img src={logo} className="w-16" alt="" />
                <a className="btn btn-ghost text-xl">HealthRxStore</a>
            </div>
            <div className="navbar-center hidden lg:flex items-center justify-center">
                <ul className="menu  gap-3 menu-horizontal px-1 items-center justify-center">
                    {links}
                </ul>
            </div>
            {
                user ? null : <div className="flex-none navbar-end">
                    <div className="dropdown dropdown-end">
                        <Link to='/signIn'>
                            <button className="btn btn-outline font-bold">
                                Join Us
                            </button>
                        </Link>
                    </div>
                </div>

            }
            {
                user && <div className="flex-none navbar-end">
                    <Link to='/cart' className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {/* <span className="badge badge-sm indicator-item">{carts?.length}</span> */}
                            </div>
                        </div>

                    </Link>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Update Profile
                                    
                                </a>
                            </li>
                            <li><NavLink to='/dashboard'>Dashboard </NavLink></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default Navbar;