import { React, useState } from 'react';
import HomeProduct from './HomeProduct';
const HomeCarousel = (props) => {
    let { title, products, border } = props;
    let [currentSlide, setCurrentSlide] = useState(0);
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
    }

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
    }
    return (
        <div className='relative' >
            <p className='text-slate-300 text-3xl font-bold mb-[20px]'>{title}</p>
            <div className={` border-b-[${border}] border-slate-600 mb-[20px] `}>
                <div className={`flex overflow-hidden scroll-smooth  whitespace-nowrap mb-[20px]`} id='carousel' >
                    <div
                        className='  scroll-smooth '
                        style={{ transform: `translateX(-${currentSlide * 16}rem)`, transition: "transform 0.5s ease-in-out", }}
                    >
                        {
                            products.map((product, index) => {
                                return <div className='inline-block  mr-4' key={index} >
                                    <HomeProduct
                                        img={product.picture}
                                        name={product.title.length > 60 ? product.title.slice(0, 56) : product.title}
                                        price={product.price}
                                        offerNum={product.offer}
                                        productId={product._id} />


                                </div>

                            })
                        }
                    </div>
                </div>
                <div className='flex absolute top-[40%] justify-between w-full'>
                    <button id='left_btn' onClick={prevSlide} >
                        <span className=" p-2  border border-slate-500 rounded-full material-symbols-outlined">
                            chevron_left
                        </span></button>
                    <button id='right_btn' onClick={nextSlide} >
                        <span className=" p-2 border border-slate-500 rounded-full material-symbols-outlined">
                            chevron_right
                        </span></button>
                </div>
            </div>
        </div>
    );
}

export default HomeCarousel;
