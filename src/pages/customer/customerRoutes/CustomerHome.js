import React, { useState } from 'react';
import HomeIcon from '../customerHome/HomeIcon';
import HomeCarousel from '../customerHome/HomeCarousel';
import { useEffect } from 'react';
// import FetchProducts from '../../../utils/FetchProducts';
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from '../../../redux/Actions/Action';
const CustomerHome = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(fetchProducts())
        setIsLoading(false);
    }, [dispatch]);


    const offerProducts = products.filter(product => {
        return product.offer > 0
    })
    const electronicProduct = products.filter(product => {
        return product.category === "electronics" && product.offer === 0
    })
    const duplicateElectronicProduct = [...electronicProduct, ...electronicProduct]
    return (



        <div className='container mx-auto' >
            <div className='flex justify-between lg:px-[5rem] px-0 py-2  overflow-scroll no-scroll scroll-mt-4
              my-7'>
                <HomeIcon icon={"shopping_bag"} iconTitle={"Grocery"} />
                <HomeIcon icon={"watch"} iconTitle={"Fashion"} />
                <HomeIcon icon={"smartphone"} iconTitle={"Mobile"} />
                <HomeIcon icon={"computer"} iconTitle={"Electronics"} />
                <HomeIcon icon={"home"} iconTitle={"Home"} />
                <HomeIcon icon={"floor_lamp"} iconTitle={"Dinning"} />
                <HomeIcon icon={"redeem"} iconTitle={"Gifts"} />
                <HomeIcon icon={"build"} iconTitle={"Tools"} />
                <HomeIcon icon={"travel"} iconTitle={"Travel"} />
            </div>
            <div className=' mb-7 relative' >

                <img className="rounded-2xl brightness-90 object-cover 
                 " src="https://m.media-amazon.com/images/I/717RUPA1bDL._SX3000_.jpg" alt="" />
                <button className='sm:font-bold py-[4px] border-blue-500 sm:py-[10px] px-3 cursor-pointer bg-blue-600 text-white rounded-full absolute top-[40%] left-[20%] hover:bg-blue-700' >
                    Shop Now</button>
            </div>
            <div className='flex justify-between mb-7' >
                <img className='w-[49%] rounded-xl'
                    src="https://static.vecteezy.com/system/resources/previews/008/070/809/original/cyber-monday-sale-with-realistic-gift-box-sale-background-horizontal-banner-for-header-or-website-design-vector.jpg" alt="" />
                <img className='w-[49%] rounded-xl'
                    src="https://img.freepik.com/premium-photo/black-friday-screen-smartphone_78895-1515.jpg" alt="" />
            </div>
            <div>
                {
                    isLoading ? <div>Loading...</div> : <> <HomeCarousel title={"Top Electronics"} products={duplicateElectronicProduct} border="1px" />
                        <HomeCarousel title={"Top Offers"} products={offerProducts} border="1px" /></>
                }

            </div>

        </div>
    );
}

export default CustomerHome;
