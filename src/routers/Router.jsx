import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import AdminLayout from '../components/layouts/AdminLayout'
import MainLayout from '../components/layouts/MainLayout'
import UsersAdmin from '../pages/admin/usersAdmin/UsersAdmin'
import Contact from '../pages/contact/Contact'
import Detail from '../pages/detail/Detail'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import News from '../pages/news/News'
import Register from '../pages/register/Register'
import BookingTicket from '../pages/BookingTicket/BookingTicket'
import Films from '../pages/admin/filmsAdmin/Films'
import CreateFilms from '../pages/admin/filmsAdmin/CreateFilms'
import CreateShowTime from '../pages/admin/filmsAdmin/CreateShowTime'
import EditUser from '../pages/admin/usersAdmin/EditUser'
import UserInformation from '../pages/userInformation/UserInformation'
import EditFilms from '../pages/admin/filmsAdmin/EditFilms'

const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '',
                    element: <Navigate to='home' />
                },
                {
                    path: 'home',
                    element: <Home />
                },
                {
                    path: 'detail/:id',
                    element: <Detail />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                },
                {
                    path: 'contact',
                    element: 'No Content'

                },
                {
                    path: 'news',
                    element: 'No Content'
                },
                {
                    path: 'ticketroom/:id',
                    element: <BookingTicket />
                },
                {
                    path: 'userinformation',
                    element: <UserInformation />
                },

            ]
        },
        {
            path: 'admin',
            element: <AdminLayout />,
            children: [
                {
                    path: 'users',
                    element: <UsersAdmin />

                },
                {
                    path: 'films',
                    element: <Films />
                },
                {
                    path: 'createfilms',
                    element: <CreateFilms />
                },
                {
                    path: 'createShowTime/:maPhim/:tenPhim',
                    element: <CreateShowTime />
                },

                {
                    path: 'user/edituser/:id',
                    element: <EditUser />

                },
                {
                    path: 'editFilms/:maPhim',
                    element: <EditFilms />
                },
            ]
        }
    ])
    return routing
}

export default Routers