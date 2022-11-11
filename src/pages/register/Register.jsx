import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { registerAction } from '../../reducers/quanLyNguoiDung/quanLyNguoiDungReducer'

const Register = () => {
    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(quanLyNguoiDungActions.register())
    // }, []);


    return (
        <div >
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center">Đăng Ký</h3>
                    <form onSubmit={handleSubmit((value) => {
                        dispatch(registerAction(value))
                    })}>
                        <div className="mt-4">
                            <div>
                                <label className="block" htmlFor="Name">Tài Khoản<label>
                                    <input type="text" placeholder="Tài Khoản" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...register('taiKhoan')} />
                                </label></label></div>
                                <span className="text-xs text-red-400"></span>
                            <div className="mt-4">
                                <label className="block">Mật Khẩu<label>
                                    <input type="password" placeholder="Mật Khẩu" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...register('matKhau')} />
                                </label></label></div>
                                <span className="text-xs text-red-400"></span>
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email<label>
                                    <input type="text" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...register('email')} />
                                </label></label></div>
                                <span className="text-xs text-red-400"></span>
                            <div className="mt-4">
                                <label className="block">Số Điện Thoại<label>
                                    <input type="text" placeholder="Số Điện Thoại" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...register('soDt')} />
                                </label></label></div>
                                <span className="text-xs text-red-400"></span>
                            <div className="mt-4">
                                <label className="block">Mã Nhóm<label>
                                    <input type="text" placeholder="Mã Nhóm" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...register('maNhom')} />
                                </label></label></div>
                                <span className="text-xs text-red-400"></span>
                            <div className="mt-4">
                                <label className="block">Họ Tên<label>
                                    <input type="text" placeholder="Họ Tên" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" {...register('hoTen')} />
                                </label></label></div>
                            <span className="text-xs text-red-400"></span>
                            <div className="flex">
                                <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Tạo Tài Khoản</button>
                            </div>
                            <div className="mt-6 text-grey-dark">
                                Đã có tài khoản? <NavLink className="text-blue-600 hover:underline" to="/login">
                                    Đăng Nhập
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register