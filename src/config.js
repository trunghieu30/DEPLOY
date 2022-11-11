import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { quanLyPhimReducer } from './reducers/quanLyPhim/quanLyPhimReducer';
import { quanLyRapReducer } from './reducers/quanLyRap';
import { quanLyDatVeReducer } from './reducers/quanLyDatVe/quanLyDatVeReducer';
import { quanLyNguoiDungReducer } from './reducers/quanLyNguoiDung/quanLyNguoiDungReducer'

const rootReducer = combineReducers({
    quanLyPhimReducer,
    quanLyRapReducer,
    quanLyDatVeReducer,
    quanLyNguoiDungReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
});
