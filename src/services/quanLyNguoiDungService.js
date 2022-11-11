import { api } from '../constants/api'

export const quanLyNguoiDungService = {
    login: (thongTinDangNhap) => {
        return api.post('QuanLyNguoiDung/DangNhap', thongTinDangNhap)
    },
    register: (thongTinDangKy) => {
        return api.post('QuanLyNguoiDung/DangKy', thongTinDangKy)
    },
    information: () => {
        return api.post("QuanLyNguoiDung/ThongTinTaiKhoan");
    },
    getUserList: (keyword) => {
        return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=gp00&${keyword}`)
    },
    addUser: (user) => {
        return api.post(`QuanLyNguoiDung/ThemNguoiDung`, user)
    },
    deleteUser: (user) => {
        return api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`)
    },
    getUserInfo: (user) => {
        return api.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${user}`)
    },
    updateUserInfo: (user) => {
        return api.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user)
    }
}