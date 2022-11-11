import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { quanLyNguoiDungActions } from '../../reducers/quanLyNguoiDung';

const AdminLayout = () => {
    const active = ({ isActive }) => isActive ? { backgroundColor: '#398dff' } : undefined
    const user = JSON.parse(localStorage.getItem("USER_LOGIN"))
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    return (
        <div className='container'>
            <div className='flex bg-gray-300'>
                <div className='w-40 bg-slate-800 h-screen'>
                    <div className='p-3'>
                        <NavLink to='/home'><img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" className='w-full' /></NavLink>
                    </div>
                    <div className='mt-5 space-y-2'>
                        <NavLink style={active} to='films' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-blue-500'>Flims</NavLink>
                        <NavLink style={active} to='users' className='block px-3 py-1 text-white text-base font-semibold hover:text-white hover:bg-blue-500'>Users</NavLink>
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='text-right bg-white p-3 space-x-2'>
                        <NavLink to="/userinformation" className="inline-block text-lg rounded-lg py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 hover:text-white transition duration-300">
                            Chào admin! {user.taiKhoan}
                        </NavLink>
                        <button onClick={() => {
                            // dispatch(quanLyNguoiDungActions.logout());
                            localStorage.removeItem("USER_LOGIN")
                            localStorage.removeItem("ACCESS_TOKEN")
                            navigate("/home");
                        }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-blue-500 hover:text-black transition duration-300">
                            Đăng xuất
                        </button>
                    </div>
                    <div className='m-3 bg-white'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout