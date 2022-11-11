import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { quanLyNguoiDungActions, deleteUserAction, getUserListAction } from '../../../reducers/quanLyNguoiDung/index'

const UsersAdmin = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { deleteUser, errDeleteUser, userList } = useSelector((state) => state.quanLyNguoiDungReducer)
    const [searchParams, setSearchParams] = useSearchParams()
    const [keyword, setKeyword] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        dispatch(getUserListAction())
    }, [])

    useEffect(() => {
        dispatch(getUserListAction(`${keyword}${searchParams.get('tuKhoa')}`))
    }, [deleteUser, searchParams])
    console.log(userList)
    return (
        <div className='UsersAdmin p-3'>
            <p className='font-bold text-xl mb-3'>Quản lý người dùng</p>
            <button onClick={() => navigate('themnguoidung')} className='py-1 px-3 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white'>Thêm người dùng</button>
            <form onSubmit={handleSubmit(data => {
                setSearchParams({ keyword: `${data.paramSearch.trim()}` })
                setKeyword('tuKhoa=')
            })} className='flex mt-2'>
                <input onInput={(e) => {
                    if (e.target.value === '') {
                        setKeyword()
                        setSearchParams()
                    }
                }} {...register('paramSearch')} type="text" placeholder='Nhập tên tài khoản' className='border w-full p-1 outline-none' />
                <button className=' bg-sky-500 text-white p-1 hover:bg-sky-800'>search</button>
            </form>
            <table className='mt-3 w-full'>
                <thead className='block'>
                    <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                        <th className='w-10'>STT</th>
                        <th className='w-36'>Tài Khoản</th>
                        <th className='w-36'>Mật Khẩu</th>
                        <th className='w-36'>Họ Tên</th>
                        <th className='w-36'>Email</th>
                        <th className='w-36'>Điện Thoại</th>
                        <th className='w-36'>Người Dùng</th>
                        <th className='flex-1'>Hành Động</th>
                    </tr>
                </thead>
                <tbody className='block h-[500px] overflow-auto'>
                    {userList?.map((nguoiDung, i) => (
                        <tr key={i} className='border-b text-left flex pl-3 py-2'>
                            <td className='w-10'>{i + 1}</td>
                            <td className='w-36 break-words'>{nguoiDung.taiKhoan}</td>
                            <td className='w-36 break-words cursor-pointer' onClick={() => {
                                if (password === i) {
                                    setPassword()
                                } else {
                                    setPassword(i)
                                }
                            }}>{password === i ? nguoiDung.matKhau : '*****'}</td>
                            <td className='w-36 break-words'>{nguoiDung.hoTen}</td>
                            <td className='w-36 break-words'>{nguoiDung.email}</td>
                            <td className='w-36 break-words'>{nguoiDung.soDT}</td>
                            <td className='w-36 break-words'>{nguoiDung.maLoaiNguoiDung === 'KhachHang' ? 'Khách Hàng' : 'Quản trị'}</td>
                            <td className='flex-1 space-x-2'>
                                <button onClick={() => navigate(`edituser/${nguoiDung.taiKhoan}`)} className='bg-green-500 p-1 rounded-md shadow text-white hover:bg-green-800'>Sửa</button>
                                <button onClick={() => { dispatch(deleteUserAction(nguoiDung.taiKhoan)) }} className='bg-red-500 p-1 rounded-md shadow text-white hover:bg-red-800'>Xoá</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteUser || errDeleteUser ?
                <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
                    <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                        <p className='text-xl text-green-500 text-center'>{deleteUser || errDeleteUser}</p>
                        <button onClick={() => dispatch(quanLyNguoiDungActions.deleteUserAction())} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
                    </div>
                </div> : ''
            }
        </div>
    )
}

export default UsersAdmin