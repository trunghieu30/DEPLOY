import { api } from "../constants/api"

export const quanLyDatVeServices = {
    layDanhSachPhongVe: (maLichChieu) => {
        return api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    },
    datVe: (danhSachVe) => {
        return api.post(`/QuanLyDatVe/DatVe`, danhSachVe)
    },
    taoLichChieu: (data) => {
        return api.post(`QuanLyDatVe/TaoLichChieu`, data);
    },
}