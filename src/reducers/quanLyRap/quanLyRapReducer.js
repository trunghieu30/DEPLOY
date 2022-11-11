import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyRapService } from '../../services/quanLyRapService';

const initialState = {
    rapList: [],
    lichChieuMovieDetail: [],
    isFetchingCumRap: false,
    isFetchingCumRapMovieDetail: false,
    isFetchingHeThongRap: false,
    isFetchingCumRapTheoHeThong: false,
    thongTinCumRap: [],
    thongTinRap: [],
};

export const { reducer: quanLyRapReducer, actions: quanLyRapActions } =
    createSlice({
        name: "quanLyRap",
        initialState,

        reducers: {},

        extraReducers: (builder) => {
            builder
                //get rap chieu
                .addCase(getRapMovieList.pending, (state, action) => {
                    state.isFetchingCumRap = true;
                })
                .addCase(getRapMovieList.fulfilled, (state, action) => {
                    state.isFetchingCumRap = false;
                    state.rapList = action.payload;
                })
                .addCase(getRapMovieList.rejected, (state, action) => {
                    state.isFetchingCumRap = false;
                    state.rapList = action.payload;
                })
                //get rap chieu detail
                .addCase(getLichChieuMovieDetail.pending, (state, action) => {
                    state.isFetchingCumRapMovieDetail = true;
                })
                .addCase(getLichChieuMovieDetail.fulfilled, (state, action) => {
                    state.isFetchingCumRapMovieDetail = false;
                    state.lichChieuMovieDetail = action.payload;
                })
                .addCase(getLichChieuMovieDetail.rejected, (state, action) => {
                    state.isFetchingCumRapMovieDetail = false;
                    state.lichChieuMovieDetail = action.payload;
                })

                // lấy thông tin hệ thống rạp
                .addCase(layThongTinHeThongRap.pending, (state, action) => {
                    state.isFetchingHeThongRap = true;
                })
                .addCase(layThongTinHeThongRap.fulfilled, (state, action) => {
                    state.isFetchingHeThongRap = false;
                    state.thongTinRap = action.payload;
                })
                .addCase(layThongTinHeThongRap.rejected, (state, action) => {
                    state.isFetchingHeThongRap = false;
                    state.thongTinRap = action.payload;
                })
                //LayThongTinCumRapTheoHeThong
                .addCase(layThongTinCumRapTheoHeThong.pending, (state, action) => {
                    state.isFetchingCumRapTheoHeThong = true;
                })
                .addCase(layThongTinCumRapTheoHeThong.fulfilled, (state, action) => {
                    state.isFetchingCumRapTheoHeThong = true;
                    state.thongTinCumRap = action.payload;
                })
                .addCase(layThongTinCumRapTheoHeThong.rejected, (state, action) => {
                    state.isFetchingCumRapTheoHeThong = true;
                    state.thongTinCumRap = action.payload;
                });
        },
    });

export const getRapMovieList = createAsyncThunk(
    "quanLyRap/getRapMovieList",
    async (data, { dispatch, getState, rejectWithValue }) => {
        try {
            const value = getState();
            const result = await quanLyRapService.getRapMovieList();

            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getLichChieuMovieDetail = createAsyncThunk(
    "quanLyRap/getLichChieuMovieDetail",
    async (idFilm, { rejectWithValue }) => {
        try {
            const result = await quanLyRapService.getLichChieuMovieDetail(idFilm);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const layThongTinHeThongRap = createAsyncThunk(
    "quanLyRap/layThongTinHeThongRap",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyRapService.layThongTinHeThongRap();
            console.log("layThongTinHeThongRap", result.data.content);
            return result.data.content;
        } catch (err) {
            return rejectWithValue(err.response, data);
        }
    }
);
export const layThongTinCumRapTheoHeThong = createAsyncThunk(
    "quanLyRap/ayThongTinCumRapTheoHeThong",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyRapService.layThongTinCumRapTheoHeThong(data);
            return result.data.content;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
