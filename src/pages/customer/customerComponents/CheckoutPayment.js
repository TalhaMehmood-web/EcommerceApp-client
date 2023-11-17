import React from 'react';

const CheckoutPayment = ({ type, cost, selectedType, specs, onRadioChange }) => {


    const handleRadioChange = () => {
        if (type !== selectedType) {
            onRadioChange(type, cost);
        }
    };

    return (
        <div>
            <div className='flex items-center mb-2'>
                <input
                    type="radio"
                    className='mr-2 cursor-pointer'
                    checked={type === selectedType}
                    name="deliverType"
                    onChange={handleRadioChange}
                />
                <p>{type}</p>
                <p className='text-white font-bold ml-2'>${cost}.00</p>
            </div>
            <p className='text-sm font-medium text-left mb-1 '>Est. delivery:Jun 21 – Jul 20</p>
            <p className='font-bold text-sm text-blue-600 whitespace-normal '>{specs}</p>
        </div>
    );
}

export default CheckoutPayment;
