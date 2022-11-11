import React from 'react';
import { NavLink } from 'react-router-dom';

export const HomeHeader = () => {
    return (
        <header className="p-4 bg-black bg-opacity-40  text-white fixed w-full z-10 header">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="	https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">

                    <li className="flex">
                        <NavLink className="flex items-center px-4 -mb-1 text-white font-medium " to="/home"  >Trang Chủ</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink className="flex items-center px-4 -mb-1   text-white  font-medium " to="/news" >Tin Tức</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink className="flex items-center px-4 -mb-1   text-white  font-medium" to="/contact" >Liên Hệ</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button className="self-center px-8 py-3 ">
                        <NavLink to="login" className="text-white">Đăng Nhập</NavLink>
                    </button>
                    <button className="self-center px-8 py-3  ">
                        <NavLink to="register" className="text-white">Đăng Ký</NavLink>
                    </button>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default HomeHeader