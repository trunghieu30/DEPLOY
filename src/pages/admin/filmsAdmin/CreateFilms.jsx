import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { postFilm } from "../../../reducers/quanLyPhim";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreateFilms = () => {
    const [componentSize, setComponentSize] = useState("default");
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const { movieList } = useSelector((state) => state.quanLyPhimReducer);
    const [film, setFilm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [img, setImg] = useState();
    useEffect(() => {
        if (localStorage.getItem("addFilm")) {
            localStorage.removeItem("addFilm");
            navigate("/admin");
        }
    }, [film]);
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

    const formik = useFormik({
        initialValues: {
            maNhom: "GP13",
            tenPhim: "",
            trailer: "",
            moTa: "",
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            ngayKhoiChieu: "",
        },
        validationSchema: yup.object().shape({
            tenPhim: yup.string().required("* vui lòng nhập thông tin"),

            trailer: yup.string().required("* vui lòng nhập thông tin"),
            moTa: yup.string().required("* vui lòng nhập thông tin"),
            danhGia: yup

                .number()

                .min(1, `điểm đánh phải lớn hơn 1`)
                .max(10, `điểm đánh phải nhỏ hơn hoặc bằng 10`),

            ngayKhoiChieu: yup.string().required("* vui lòng chọn ngày"),
            dangChieu: yup
                .boolean()
                .required("Required")
                .oneOf([true], "Vui lòng chọn trạng thái phim"),
            sapChieu: yup
                .boolean()
                .required("Required")
                .oneOf([true], "Vui lòng chọn trạng thái phim")
                .when("dangChieu", {
                    is: true,
                    then: yup.boolean().notRequired().oneOf([false]),
                }),
            hinhAnh: yup.mixed("vui lòng").required("vui lòng chọn ảnh"),
        }),

        onSubmit: async (values) => {
            let formData = new FormData();

            for (let key in values) {
                if (key !== "hinhAnh") {
                    formData.append(key, values[key]);
                } else {
                    formData.append("file", values.hinhAnh, values.hinhAnh.name);
                }
            }

            await dispatch(postFilm(formData));
            await setFilm(true);
        },
    });

    const handleChangeDatePicker = (value) => {
        let date = moment(value).format("DD-MM-YYYY");
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
                    onChange={formik.handleChange}
                    value={formik.values.tenPhim}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.tenPhim && formik.touched.tenPhim && (
                    <p className="text-red-400">{formik.errors.tenPhim}</p>
                )}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input
                    name="trailer"
                    onChange={formik.handleChange}
                    value={formik.values.trailer}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.trailer && formik.touched.trailer && (
                    <p className="text-red-400">{formik.errors.trailer}</p>
                )}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input
                    name="moTa"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.moTa && formik.touched.moTa && (
                    <p className="text-red-400">{formik.errors.moTa}</p>
                )}
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker
                    name="ngayKhoiChieu"
                    format="DD-MM-YYYY"
                    onChange={handleChangeDatePicker}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu && (
                    <p className="text-red-400">{formik.errors.ngayKhoiChieu}</p>
                )}
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch name="dangChieu" onChange={handleValue("dangChieu")} />
                {formik.errors.dangChieu && formik.touched.dangChieu && (
                    <p className="text-red-400">{formik.errors.dangChieu}</p>
                )}
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch name="sapChieu" onChange={handleValue("sapChieu")} />
                {formik.errors.sapChieu && formik.touched.sapChieu && (
                    <p className="text-red-400">{formik.errors.sapChieu}</p>
                )}
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleValue("hot")} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber
                    name="danhGia"
                    onBlur={formik.handleBlur}
                    onChange={(value) => {
                        formik.setFieldValue("danhGia", value);
                    }}
                />
                {formik.errors.danhGia && formik.touched.danhGia && (
                    <p className="text-red-400">{formik.errors.danhGia}</p>
                )}
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList">
                <input
                    type="file"
                    name="hinhAnh"
                    onChange={handleImg}
                    accept="image/jpeg,image/png,image/gif"
                />
                {formik.errors.hinhAnh && formik.touched.hinhAnh && (
                    <p className="text-red-400">{formik.errors.hinhAnh}</p>
                )}
                <br />
                <img style={{ width: 80 }} src={img} alt="..." />
            </Form.Item>

            <Form.Item>
                <Button
                    htmlType="submit"
                    type="primary"
                    className="bg-blue-400 text-white px-4 py-2 ml-[28%] rounded-md"
                >
                    Thêm Phim
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateFilms;
