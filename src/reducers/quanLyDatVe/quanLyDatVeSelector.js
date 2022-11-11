import { useSelector } from "react-redux";

export const useQuanLyDatVe = () =>
    useSelector((state) => state.quanLyDatVeReducer);