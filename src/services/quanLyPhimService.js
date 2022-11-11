import { api } from '../constants/api'

export const quanLyPhimService = {
    getMovieBannerList: () => {
        return api.get('QuanLyPhim/LayDanhSachBanner')
    },
    getMovieList: (value) => {
        if (!value.trim()) {
            return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP13`);
        } else {
            return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${value}`);
        }
    },
    getMovieDetail: (idFilm) => {
        return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
    },
    postFilm: (film) => {
        return api.post("QuanLyPhim/ThemPhimUploadHinh", film);
    },
    getInfoMovies: (idFilm) => {
        return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`);
    },
    postFilmUpdate: (formData) => {
        return api.post(`QuanLyPhim/CapNhatPhimUpload`, formData);
    },
    deleteFilm: (idFilm) => {
        return api.delete(`QuanLyPhim/XoaPhim?MaPhim=${idFilm}`);
    },
    getMovieBannerList: () => {
        return api.get(`QuanLyPhim/LayDanhSachBanner`);
    },
}