import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyDatVeServices } from '../../services/quanLyDatVeService';

const initialState = {
    danhSachPhongVe: {}, isFetchDanhSachPhongVe: false, errDanhSachPhongVe: undefined,
    danhSachGheDangDat: [],
    ketQuaDatVe: null, isFetchKetQuaDatVe: false, errKetQuaDatVe: undefined,
    lichChieu: null, isFetchLichChieu: false, errLichChieu: undefined
}

export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } = createSlice({
    name: 'quanLyDatVe',
    initialState,
    reducers: {
        danhSachGheDangDat: (state, action) => {
            const index = state.danhSachGheDangDat.findIndex(ghe => ghe.maGhe === action.payload.maGhe)
            if (index !== -1) {
                state.danhSachGheDangDat.splice(index, 1)
            } else {
                state.danhSachGheDangDat = [...state.danhSachGheDangDat, action.payload]
            }
        },
        huyErrKetQuaDatVe: (state, action) => {
            state.danhSachGheDangDat = []
            state.errKetQuaDatVe = undefined
            state.ketQuaDatVe = null
        },
        lichChieu: (state, action) => {
            state.lichChieu = null
            state.errLichChieu = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(layDanhSachPhongVe.pending, (state, action) => {
                state.isFetchDanhSachPhongVe = true
            }).addCase(layDanhSachPhongVe.fulfilled, (state, action) => {
                state.danhSachPhongVe = action.payload
                state.isFetchDanhSachPhongVe = false
            }).addCase(layDanhSachPhongVe.rejected, (state, action) => {
                state.errDanhSachPhongVe = action.payload
                state.isFetchDanhSachPhongVe = false
            })
            .addCase(datVe.pending, (state, action) => {
                state.isFetchKetQuaDatVe = true
            }).addCase(datVe.fulfilled, (state, action) => {
                state.isFetchKetQuaDatVe = false
                state.errKetQuaDatVe = undefined
                state.ketQuaDatVe = action.payload
            }).addCase(datVe.rejected, (state, action) => {
                state.isFetchKetQuaDatVe = false
                state.ketQuaDatVe = null
                state.errKetQuaDatVe = action.payload
            })
    }
});

export const layDanhSachPhongVe = createAsyncThunk('quanLyDatVe/layDanhSachPhongVe',
    async (maLichChieu, { rejectWithValue }) => {
        try {
            const result = await quanLyDatVeServices.layDanhSachPhongVe(maLichChieu)
            return result.data.content
        } catch (err) {
            return rejectWithValue(err.response.data.content)
        }
    }
)
export const datVe = createAsyncThunk('quanLyDatVe/datVe',
    async (danhSachVe, { rejectWithValue }) => {
        try {
            const result = await quanLyDatVeServices.datVe(danhSachVe)
            return result.data.content
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)
export const taoLichChieu = createAsyncThunk(
    "quanLiDatVe/taoLichChieu",
    async (data, { }) => {
        try {
            const result = await quanLyDatVeServices.taoLichChieu(data);
            alert(result.data.content);
        } catch (err) {
        }
    }
);