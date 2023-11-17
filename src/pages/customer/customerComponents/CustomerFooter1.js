import React from 'react';

const CustomerFooter1 = () => {
    return (
        <div className='bg-slate-800   w-full' >
            <div className='lg:container lg:mx-auto lg:flex lg:justify-between xl:px-20 flex-wrap px-0 py-9' >
                <div className='lg:w-[30%] ' >
                    <p className="footer1-p text-3xl">BuyIt</p>
                    <p className='footer-sm-text' >Phoenix is an admin dashboard template with fascinating
                        features and amazing layout. The template is responsive
                        to all major browsers and is compatible with all
                        available devices and screen sizes.</p>
                </div>
                <div className='flex justify-between mt-4 flex-wrap lg:w-[65%]' >
                    <div className='mt-2'>
                        <p className="footer1-p">About BuyIt</p>
                        <ul className='footer-sm-text ' >
                            <li className='hover:underline hover:decoration-blue-600 '>Careers</li>
                            <li className='hover:underline hover:decoration-blue-600 '>Affiliate Program</li>
                            <li className='hover:underline hover:decoration-blue-600 '>Privacy Policy</li>
                            <li className='hover:underline hover:decoration-blue-600 '>Terms & Conditions</li>

                        </ul>
                    </div>
                    <div className='mt-2'>
                        <p className="footer1-p">Stay Connected</p>
                        <ul className='footer-sm-text'>
                            <li className='hover:underline hover:decoration-blue-600 '>Blogs </li>
                            <li className='hover:underline hover:decoration-blue-600 '>Facebook </li>
                            <li className='hover:underline hover:decoration-blue-600 '>Twitter </li>

                        </ul>
                    </div>
                    <div className='mt-2'>
                        <p className="footer1-p">Customer Service</p>
                        <ul className='footer-sm-text'>
                            <li className='hover:underline hover:decoration-blue-600 '>Help Desk</li>
                            <li className='hover:underline hover:decoration-blue-600 '>Support, 24/7</li>
                            <li className='hover:underline hover:decoration-blue-600 '>Community of Phoenix</li>
                        </ul>
                    </div>
                    <div className='mt-2'>
                        <p className="footer1-p">Payment Method</p>
                        <ul className='footer-sm-text '>
                            <li className='hover:underline hover:decoration-blue-600 '>Cash on Delivery </li>
                            <li className='hover:underline hover:decoration-blue-600 '>Online Payment </li>
                            <li className='hover:underline hover:decoration-blue-600 '>PayPal </li>
                            <li className='hover:underline hover:decoration-blue-600'>Installment </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerFooter1;
