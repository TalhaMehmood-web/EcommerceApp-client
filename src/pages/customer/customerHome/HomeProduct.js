import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const HomeProduct = (props) => {
    const navigate = useNavigate();
    let { img, name, price, offerNum, productId } = props;
    const [loading, setLoading] = useState(true);
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        if (offerNum > 0) {
            setOffer(
                <p className='text-green-500 p-2 py-[2px] absolute top-[4%] left-[5px] text-sm font-light border border-slate-700 rounded-lg w-fit'>
                    {offerNum}% off
                </p>
            );
        } else {
            setOffer(null);
        }

        // Simulating loading for 1.5 seconds
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeoutId); // Cleanup to avoid memory leaks
    }, [offerNum]);

    const handleClick = () => {
        navigate(`/customer/product-details/${productId}`);
    };

    return (
        <div className='w-[15rem] relative'>
            <div>
                {loading ? (
                    <div className="flex justify-center">
                        <ColorRing
                            visible={true}
                            height='80'
                            width='80'
                            ariaLabel='blocks-loading'
                            wrapperStyle={{}}
                            wrapperclassName='blocks-wrapper'
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                ) : (
                    <>
                        <img className='border border-slate-700 rounded-lg w-[15rem] h-[15rem] bg-slate-900 object-cover p-3' src={img} alt='' />
                        <div className='w-[35px] h-[35px] absolute top-2 right-2 border border-blue-500 rounded-full cursor-pointer hover:bg-white'>
                            <span className='material-symbols-outlined text-blue-500 font-thin relative top-[18%] left-[5px] hover:text-blue-500 hover:font-semibold'>
                                favorite
                            </span>
                        </div>
                        {offer}
                    </>
                )}
            </div>
            <p
                className='cursor-pointer whitespace-normal text-white text-[0.8rem] font-bold mt-5 hover:text-blue-600 hover:underline hover:decoration-blue-600'
                onClick={handleClick}
            >
                {name.length < 35 ? name += ' Lorem ipsum dolor sit amet ' : name.length > 35 ? name.slice(0, 50) : name}...
            </p>
            <div className='flex items-center justify-around mt-5'>
                <p className='font-bold text-white text-2xl'>${price}.00</p>
                <p className='border-green rounded-md px-2 py-1 text-white bg-green-600 w-fit text-sm'>InStock</p>
            </div>
        </div>
    );
};

export default HomeProduct;
