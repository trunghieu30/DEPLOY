import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
} from "antd";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
    getInfoMovies,
    postFilmUpdate,
} from "../../../reducers/quanLyPhim";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
const EditFilms = () => {
    const [componentSize, setComponentSize] = useState("default");
    const { maPhim } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("filmUpdate")) {
            localStorage.removeItem("filmUpdate");
            navigate("/admin");
        }
    }, [state]);
    useEffect(() => {
        dispatch(getInfoMovies(maPhim));
    }, []);
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    // xử lý load ảnh khi chọn file
    const [img, setImg] = useState();
    const handleImg = (e) => {
        const file = e.target.files[0];

        if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif"
        ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImg(e.target.result);
            };
        }
        formik.setFieldValue("hinhAnh", file);
    };

    const { infoMovie } = useSelector((state) => state.quanLyPhimReducer);
    // submit form bằng formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maNhom: "GP13",
            tenPhim: infoMovie.tenPhim,
            trailer: infoMovie.trailer,
            moTa: infoMovie.moTa,
            maPhim: infoMovie.maPhim,
            sapChieu: infoMovie.sapChieu,
            dangChieu: infoMovie.dangChieu,
            hot: infoMovie.hot,
            danhGia: infoMovie.danhGia,
            hinhAnh: null,
            ngayKhoiChieu: infoMovie.ngayKhoiChieu,
        },
        validationSchema: yup.object().shape({
            tenPhim: yup.string().required("* vui lòng nhập thông tin"),

            trailer: yup.string().required("* vui lòng nhập thông tin"),
            moTa: yup.string().required("* vui lòng nhập thông tin"),
            danhGia: yup
                .number()
                .min(1, `điểm đánh phải lớn hơn 1`)
                .max(10, `điểm đánh phải nhỏ hơn hoặc bằng 10`),

            ngayKhoiChieu: yup.string().required("* vui lòng chọn ngày chiếu"),
        }),
        onSubmit: async (values) => {
            let formData = new FormData();

            for (let key in values) {
                if (key !== "hinhAnh") {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append("file", values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }

            await dispatch(postFilmUpdate(formData));
            await setState(true);
        },
    });
    const handleChangeDatePicker = (value) => {
        let date = moment(value);
        formik.setFieldValue("ngayKhoiChieu", date);
    };
    const handleValue = (name) => {
        return (value) => formik.setFieldValue(name, value);
    };
    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input
                    name="tenPhim"
                    value={formik.values.tenPhim}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.tenPhim && formik.touched.tenPhim && (
                    <p className="text-red-400">{formik.errors.tenPhim}</p>
                )}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input
                    name="trailer"
                    value={formik.values.trailer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.trailer && formik.touched.trailer && (
                    <p className="text-red-400">{formik.errors.trailer}</p>
                )}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input
                    name="moTa"
                    value={formik.values.moTa}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.moTa && formik.touched.moTa && (
                    <p className="text-red-400">{formik.errors.moTa}</p>
                )}
            </Form.Item>
            <Form.Item label="Ngày khổi chiếu">
                <DatePicker
                    name="ngayKhoiChieu"
                    value={moment(formik.values.ngayKhoiChieu)}
                    format="DD-MM-YYYY"
                    onChange={handleChangeDatePicker}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu && (
                    <p className="text-red-400">{formik.errors.ngayKhoiChieu}</p>
                )}
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch
                    name="dangChieu"
                    checked={formik.values.dangChieu}
                    onChange={handleValue("dangChieu")}
                />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch
                    name="sapChieu"
                    checked={formik.values.sapChieu}
                    onChange={handleValue("sapChieu")}
                />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch
                    name="hot"
                    checked={formik.values.hot}
                    onChange={handleValue("hot")}
                />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber
                    name="danhGia"
                    onChange={(value) => {
                        formik.setFieldValue("danhGia", value);
                    }}
                    value={formik.values.danhGia}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.danhGia && formik.touched.danhGia && (
                    <p className="text-red-400">{formik.errors.danhGia}</p>
                )}
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList">
                <input
                    type="file"
                    onChange={handleImg}
                    accept="image/jpeg,image/png,image/gif"
                />
                <br />
                <img
                    style={{ width: 80 }}
                    src={!img ? infoMovie.hinhAnh : img}
                    alt="..."
                />
            </Form.Item>

            <Form.Item>
                <Button
                    htmlType="submit"
                    type="submit"
                    // type="primary"
                    className="bg-blue-400 text-white px-4 py-2 ml-[28%] rounded-md"
                >
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditFilms;
