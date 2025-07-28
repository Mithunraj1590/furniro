import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RoomCard from '../../components/RoomCard';
import styles from './roomInspiration.module.scss';
import { Link } from 'react-router-dom';

const RoomInspiration = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const rooms = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
            category: 'Bed Room',
            title: 'Inner Peace',
            description: 'A serene bedroom design with calming colors and minimalist decor'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
            category: 'Dining Room',
            title: 'Modern Elegance',
            description: 'Contemporary dining space with clean lines and natural materials'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
            category: 'Living Room',
            title: 'Cozy Comfort',
            description: 'Warm and inviting living area perfect for family gatherings'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1532372320572-cda25653a58f?w=600&h=400&fit=crop',
            category: 'Kitchen',
            title: 'Culinary Haven',
            description: 'Functional and beautiful kitchen design for the modern home'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
            category: 'Study Room',
            title: 'Productive Space',
            description: 'Organized study area designed for focus and creativity'
        }
    ];


    return (
        <section className={styles.roomInspiration}>
            <div className={styles.content_area}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className={styles.content}>
                            <h2 className={styles.title}>
                                50+ Beautiful rooms inspiration
                            </h2>
                            <p className={styles.description}>
                                Our designer already made a lot of beautiful prototype of rooms that inspire you
                            </p>
                            <Link to="/inspiration" className="btn btn-primary">
                                Explore More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className={styles.slide_area}>
                <div className="row">
                    <div className="col-lg-5"></div>
                    <div className="col-lg-7">
                        <div className={styles.slider}>
                            <Swiper
                                spaceBetween={20}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                className='w-auto'
                                loop={true}
                                modules={[Navigation, Pagination]}
                                navigation={false}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 15,
                                        navigation: false,
                                    },
                                    576: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 15,
                                        navigation: false,
                                    },
                                    768: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 20,
                                        navigation: false,
                                    },
                                    992: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 20,
                                        navigation: false,
                                    },
                                    1200: {
                                        slidesPerView: 2.3,
                                        spaceBetween: 20,
                                        navigation: true,
                                    }
                                }}
                            >
                                {rooms?.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <RoomCard room={item} />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomInspiration; 