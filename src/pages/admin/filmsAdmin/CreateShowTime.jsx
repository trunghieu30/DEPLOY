import React, { useEffect, useState } from "react";
import { Button, Form, DatePicker, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    layThongTinCumRapTheoHeThong,
    layThongTinHeThongRap,
} from "../../../reducers/quanLyRap";
import { useFormik } from "formik";
import moment from "moment";
import { useParams } from "react-router-dom";
import { taoLichChieu } from "../../../reducers/quanLyDatVe/quanLyDatVeReducer";

export const CreateShowTime = () => {
    const dispatch = useDispatch();
    const [rap, setRap] = useState();
    const { maPhim, tenPhim } = useParams();
    useEffect(() => {
        dispatch(layThongTinHeThongRap());
    }, []);
    useEffect(() => {
        if (rap) {
            dispatch(layThongTinCumRapTheoHeThong(rap));
        }
    }, [rap]);
    const { thongTinRap, thongTinCumRap } = useSelector(
        (state) => state.quanLyRapReducer
    );

    const handleConvertHeThongRap = () => {
        return thongTinRap.map((rap) => ({
            value: rap.maHeThongRap,
            label: rap.tenHeThongRap,
        }));
    };
    const handleChangeHeThongRap = (value) => {
        setRap(value);
        console.log(value);
    };
    const handleCumRap = () => {
        if (thongTinCumRap) {
            return thongTinCumRap.map((cumRap) => ({
                value: cumRap.maCumRap,
                label: cumRap.tenCumRap,
            }));
        }
    };

    const formik = useFormik({
        initialValues: {
            maPhim: maPhim,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: "",
        },
        onSubmit: (values) => {
            dispatch(taoLichChieu(values));
        },
    });

    const handleChangeDatePicker = (value) => {
        let date = moment(value).format("DD/MM/YYYY hh:mm:ss");
        formik.setFieldValue("ngayChieuGioChieu", date);
    };
    const onOk = (value) => {
        let date = moment(value).format("DD/MM/YYYY hh:mm:ss");
        formik.setFieldValue("ngayChieuGioChieu", date);
    };
    const handleChangeInput = (value) => {
        formik.setFieldValue("giaVe", value);
    };
    return (
        <div className="lg:container mx-auto">
            <Form
                onSubmitCapture={formik.handleSubmit}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
            >
                <h2 className="text-2xl mb-10">Tên Phim - {tenPhim}</h2>
                <Form.Item label="Hệ thống rạp">
                    <Select
                        onChange={handleChangeHeThongRap}
                        options={handleConvertHeThongRap()}
                    />
                </Form.Item>
                <Form.Item label="Cụm rạp">
                    <Select
                        options={handleCumRap()}
                        onChange={(value) => {
                            formik.setFieldValue("maRap", value);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker
                        showTime
                        format="DD/MM/YYYY hh:mm:ss"
                        onChange={handleChangeDatePicker}
                        onOk={onOk}
                    />
                </Form.Item>
                <Form.Item label="Giá vé">
                    <InputNumber min={75000} max={150000} onChange={handleChangeInput} />
                </Form.Item>
                <Form.Item>
                    <Button className="ml-[25%]" type="primary" htmlType="submit">
                        Tạo lịch chiếu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default CreateShowTime