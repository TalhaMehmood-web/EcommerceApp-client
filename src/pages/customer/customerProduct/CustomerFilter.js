import React, { useState, useEffect } from 'react';

import ToggleSection from '../../../utils/HandleToogle';

const CustomerFilter = ({ setFilteredProduct, products }) => {
    const [vendor, setVendor] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]); // Define selectedFilters here

    useEffect(() => {
        const uniqueVendors = [...new Set(products.map(product => product.vendor))];
        const uniqueCategory = [...new Set(products.map(product => product.category))];
        setCategory(uniqueCategory);
        setVendor(uniqueVendors);
    }, [products]);

    const handleChange = (filter) => {
        const newSelectedFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(item => item !== filter)
            : [...selectedFilters, filter];

        const filtered = products.filter(product => {
            return newSelectedFilters.length === 0 || newSelectedFilters.includes(product.vendor) || newSelectedFilters.includes(product.category);
        });

        setFilteredProduct(filtered);
        setSelectedFilters(newSelectedFilters); // Update the selectedFilters state
    };

    return (
        <div className=' border border-slate-700 p-2 h-fit w-fit' >
            <p className='text-slate-300 font-bold text-3xl' >Filters</p>
            <ToggleSection title="Brands" items={vendor} handleChange={handleChange} />
            <ToggleSection title="Category" items={category} handleChange={handleChange} />
        </div>
    );
};

export default CustomerFilter;
