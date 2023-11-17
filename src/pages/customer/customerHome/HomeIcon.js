import React from 'react';

const HomeIcon = (props) => {
    const { icon, iconTitle } = props
    return (
        <div className='cursor-pointer flex items-center flex-col mx-4' >
            <div className='bg-slate-800 border-slate-800 rounded-lg w-fit hover:bg-blue-400 ' >
                <span className="material-symbols-outlined py-2 px-2 text-4xl hover:text-black">
                    {icon}
                </span>
            </div>
            <p className='text-sm hover:underline hover:decoration-blue-400'>{iconTitle}</p>
        </div>
    );
}

export default HomeIcon;
