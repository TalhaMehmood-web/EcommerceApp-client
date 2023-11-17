import { React, useState } from 'react';
import "../../../css/componentsCss/addProduct.css";
import AdminFooter from "../adminComponents/AdminFooter";
import jwt from "jwt-decode";
import axios from '../../../utils/AxiosConfiq';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {

    const [selectedSection, setSelectedSection] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const [price, setPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [shippingType, setShippingType] = useState(true);
    const [category, setCategory] = useState("");
    const [vendor, setVendor] = useState("");
    const [offer, setOffer] = useState(0);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const decode = jwt(token);
            const adminId = decode._id;

            if (!title || !description || !picture || !price || !stockQuantity || !category || !vendor) {
                toast.warn('All fields are mandatory to be filled', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            const { data } = await axios.post(`api/admin/add-product/${adminId}`, { title, description, picture, price, stockQuantity, shippingType, category, vendor, offer })
            if (data) {
                toast.success('Product Published Successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
            }


            setTitle("");
            setDescription("");
            setPicture("");
            setPicture("");
            setVendor("");
            setPrice("")
            setCategory("");
            setStockQuantity("");



        } catch (error) {
            toast.warn(`${error.response.data.error}`, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }
    return (
        <>        <section>
            <div className='product-form'  >
                <div className="product-header">
                    <div className="header-main">
                        <p className='title ' >Add a product</p>
                        <p className='sub-txt' >Orders placed across your store</p>
                    </div>
                    <div className="toast-display">
                        {toast}
                    </div>
                    <div className="header-btn product-btn ">
                        <button onClick={handleSubmit} >
                            Publish Product
                        </button>
                    </div>
                </div>
                <div className="product-main">
                    <div className="main-left">
                        <div className="product-title section-margin ">
                            <p className="sub-title">Product Title</p>
                            <input className="main-inputs bg-slate-900  border border-slate-950 rounded-md" type="text" placeholder='Write title here..'
                                value={title} onChange={(e) => {
                                    setTitle(e.target.value)
                                }} />
                        </div>
                        <div className="product-description section-margin">
                            <p className="sub-title">Product Description</p>
                            <textarea name="textarea" id="textarea" value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }} className='main-inputs bg-slate-900  border border-slate-950 rounded-md' placeholder='Write description here...' cols="30" rows="10"></textarea>
                        </div>
                        <div className="product-img section-margin">
                            <p className="sub-title">Display Image</p>
                            <input className="main-inputs bg-slate-900  border border-slate-950 rounded-md" type="text" value={picture} onChange={(e) => {
                                setPicture(e.target.value)
                            }} placeholder='Image url..' />
                        </div>
                        <div className="product-inventory section-margin">
                            <p className="sub-title">Inventory</p>
                            <div className="inventory">
                                <div className="inv-left">
                                    <li onClick={() => handleSectionClick('Pricing')} ><span className="material-symbols-outlined">
                                        sell
                                    </span> <p>Pricing</p></li>
                                    <li onClick={() => handleSectionClick('Restock')} ><span className="material-symbols-outlined">
                                        deployed_code
                                    </span><p>Restock</p> </li>
                                    <li onClick={() => handleSectionClick('Shipping')} ><span className="material-symbols-outlined">
                                        local_shipping
                                    </span> <p>Shipping</p> </li>
                                </div>
                                <div className="inv-right">
                                    {selectedSection === 'Pricing' &&
                                        <div className="pricing-content">
                                            <div className="pricing">
                                                <p>Sales Price</p>
                                                <input type="number" min={1} placeholder='$ Sales Price' value={price} onChange={(e) => {
                                                    setPrice(e.target.value)
                                                }} />
                                                <button style={{ padding: "10px 24px" }} className='product-btn'>Confirm</button>
                                            </div>
                                        </div>}
                                    {selectedSection === 'Restock' &&
                                        <div className="stock pricing">
                                            <p>Available Stock</p>
                                            <input type="number" placeholder='Available Stock' min={1} value={stockQuantity}
                                                onChange={(e) => {
                                                    setStockQuantity(e.target.value)
                                                }} />
                                            <button style={{ padding: "10px 24px" }} className='product-btn' >Confirm</button>
                                        </div>}
                                    {selectedSection === 'Shipping' &&
                                        <div className="shipping">

                                            <p className='shipping-title' >Shipping Type</p>
                                            <div className="shipping-content">
                                                <input type="radio" id="fulfilledBySeller" name="shippingOption" value={false} checked
                                                    onChange={(e) => {
                                                        setShippingType(e.target.value)
                                                    }}
                                                />
                                                <label for="fulfilledBySeller">Fulfilled by Seller</label>
                                                <p>You’ll be responsible for product delivery. <br />
                                                    Any damage or delay during shipping may cost you a Damage fee.</p>
                                            </div>
                                            <div className="shipping-content">
                                                <input type="radio" id="fulfilledBySeller" name="shippingOption" value={true}
                                                    onChange={(e) => {
                                                        setShippingType(e.target.value)
                                                    }}
                                                    checked />
                                                <label for="fulfilledBySeller">Fulfilled by BuyIt</label>
                                                <p>Your product, Our responsibility. <br />
                                                    For a measly fee, we will handle the delivery process for you.</p>
                                            </div>
                                        </div>}


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-right">
                        <div className="organize bg-slate-900  border border-slate-950 rounded-md ">
                            <div className="organize-content">
                                <p className="sub-title" style={{ marginBottom: "20px" }} >Organize</p>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "15px" }} >
                                    <label>Category</label>
                                    <select className='bg-slate-900 outline-none rounded-md border border-slate-700  text-slate-200' id="category" value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value)
                                        }} >
                                        <option value="" >Choose a category</option>
                                        <option value="grocery">Grocery</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="dining">Dining</option>
                                        <option value="gifts">Gifts</option>
                                        <option value="tools">Tools</option>
                                        <option value="travel">Travel</option>
                                        <option value="automotive">Automotive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="vendor organize-input">
                                <p>Vendor</p>
                                <input className='bg-slate-900 outline-none rounded-md border border-slate-700  text-slate-200 py-2' type="text" placeholder='Vendor' value={vendor}
                                    onChange={(e) => {
                                        setVendor(e.target.value)
                                    }} />
                            </div>
                            <div className="collection organize-input">
                                <p>Offer</p>
                                <input className='bg-slate-900 outline-none rounded-md border border-slate-700  text-slate-200 px-2' type="Number" placeholder='Offer...' min={1}
                                    onChange={(e) => {
                                        setOffer(e.target.value)
                                    }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="footer">
                <AdminFooter />
            </div>
        </section >
            <ToastContainer />
        </>

    );
}

export default AddProduct;
