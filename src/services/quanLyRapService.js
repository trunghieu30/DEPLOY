import { api } from "../constants/api";

export const quanLyRapService = {
    getRapMovieList: () => {
        return api.get("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP13");
    },
    getLichChieuMovieDetail: (idFilm) => {
        return api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idFilm}`);
    },
    layThongTinHeThongRap: () => {
        return api.get(`QuanLyRap/LayThongTinHeThongRap`);
    },
    layThongTinCumRapTheoHeThong: (maRap) => {
        return api.get(
            `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`
        );
    },
};
