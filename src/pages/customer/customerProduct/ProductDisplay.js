import React, { useState } from 'react';

import HomeProduct from '../customerHome/HomeProduct';

const ProductDisplay = ({ products }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    return (
        <div className='flex flex-col justify-between h-full  items-center' >
            <div className='grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 gap-[20px]  '>
                {productsToDisplay.map((product, index) => (
                    <div key={index}>
                        <HomeProduct
                            img={product.picture}
                            name={product.title}
                            price={product.price}
                            offerNum={product.offer}
                            productId={product._id}
                        />
                    </div>
                ))}

            </div>
            <div className='pagination'>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleClick(page)}
                        className="border border-slate-500 mt-4 py-[3px] px-3 rounded-[3px] hover:bg-blue-500 hover:border-white hover:text-white "
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductDisplay;
