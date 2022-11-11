import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuanLyPhim } from "../../reducers/quanLyPhim/quanLyPhimSelector";
import { getMovieBannerList } from "../../reducers/quanLyPhim/quanLyPhimReducer";
import { Carousel } from "antd";

const contentStyle = {
    height: '760px',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

};
const HomeCarousel = () => {

    const dispatch = useDispatch()
    const { bannerList } = useQuanLyPhim()

    useEffect(() => {
        dispatch(getMovieBannerList())
    }, [])

    return (
        <div className="w-full">
            <Carousel effect="fade" autoplay >
                {bannerList.map((item) => {
                    return (
                        <div key={item.maBanner}>
                            <div
                                style={{
                                    ...contentStyle,
                                    backgroundImage: `url(${item.hinhAnh})`,
                                }}
                            >
                                <img
                                    className="w-full opacity-0"
                                    src={item.hinhAnh}
                                    alt={item.maPhim}
                                />
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>


    )
}

export default HomeCarousel