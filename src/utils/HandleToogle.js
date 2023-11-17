import { useState } from "react";
const ToggleSection = ({ title, items, handleChange }) => {
    const [expanded, setExpanded] = useState(true);

    const toggleSection = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <div className="flex items-center justify-between" onClick={toggleSection}>
                <p className="text-white font-bold text-xl my-[10px]">{title}</p>
                <span className="material-symbols-outlined cursor-pointer">
                    {`expand_${expanded ? 'less' : 'more'}`}
                </span>
            </div>
            <div className={`custom-transition ${expanded ? 'expanded' : 'collapsed'}`}>
                {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <input type="checkbox" className="cursor-pointer mr-2" onChange={() => {
                            handleChange(item)
                        }} />
                        <label>{item[0].toUpperCase() + item.slice(1, item.length)}</label>
                    </div>
                ))
                }
            </div>
        </div>
    );
};
export default ToggleSection