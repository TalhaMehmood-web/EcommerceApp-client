import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "../../../utils/AxiosConfiq"
import "../../../css/componentsCss/listProduct.css";
import AdminFooter from "../adminComponents/AdminFooter";
import jwt from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner'
const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("");
    // const [productId, setProductId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedVendor, setSelectedVendor] = useState("");
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [stockQuantity, setStockQuantity] = useState("")
    const [vendor, setVendor] = useState("")
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const decode = jwt(token);
                let adminId = decode._id


                const response = await axios.get(`/api/admin/list-product/${adminId}`);
                setProducts(response.data.products);

                setIsLoading(false)
                const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
                setCategories(uniqueCategories);

                const uniqueVendors = [...new Set(response.data.products.map(product => product.vendor))];
                setVendors(uniqueVendors);
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
                setIsLoading(false)
            }
        };

        fetchProducts();
    }, []);



    const handleCheckboxChange = (productId) => {
        if (productId === selectedCheckbox) {
            setSelectedCheckbox(null)
        }
        else {
            setSelectedCheckbox(productId);
        }

    }
    const editProduct = (productId) => {


        setSelectedCheckbox(productId);
        setEditMode(true)

    }
    const updateProduct = async () => {
        try {
            if (selectedCheckbox) {



                const updated = await axios.put(`/api/admin/edit-product/${selectedCheckbox}`, { price, category, stockQuantity, vendor })
                if (updated) {
                    setEditMode(false)
                    setSelectedCheckbox(null);
                    toast.success('Product Updated Successfully', {
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
        }

        catch (error) {
            console.log(error);
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
    const handleRemoveProduct = async () => {
        try {
            if (selectedCheckbox) {

                const deleted = await axios.delete(`/api/admin/delete-product/${selectedCheckbox}`)
                if (deleted) {
                    toast.warn('Product Deleted', {
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
                setProducts(products.filter(product => product._id !== selectedCheckbox))
                // setSelectedCategory(null)
            }
        }
        catch (error) {
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
    const filteredProducts = products.filter(product => {
        const categoryFilter = selectedCategory === "" || product.category === selectedCategory;
        const vendorFilter = selectedVendor === "" || product.vendor === selectedVendor;
        const titleFilter = product.title.toLowerCase().includes(filter.toLowerCase());

        return categoryFilter && vendorFilter && titleFilter;
    });
    return (
        <>
            <div className="list-product">
                <div className="product-content">
                    <p className='title' >Products</p>
                    <div className="product-filter">
                        <div className="search-input">
                            <span className="material-symbols-outlined">
                                search
                            </span>
                            <input type="text" placeholder='Search Product'
                                onChange={(e) => {
                                    setFilter(e.target.value.toLowerCase())
                                }} />
                        </div>
                        <div className="admin-filter">
                            <div className="category-filter">
                                <select
                                    value={selectedCategory} className='transparent' style={{ borderRight: "1px solid #b1bacf" }}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="" className='filter-option' >Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="vendor-filter">
                                <select
                                    value={selectedVendor} className='transparent'
                                    onChange={(e) => setSelectedVendor(e.target.value)}
                                >
                                    <option value=""  >Vendor</option>
                                    {vendors.map(vendor => (
                                        <option key={vendor} value={vendor}  >
                                            {vendor}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="add-more flex items-center justify-between ">
                            <button className='text-white bg-red-500 border border-red-600 rounded-md px-2 py-2 hover:bg-red-600 '
                                onClick={handleRemoveProduct}
                            >Remove</button>
                            {
                                editMode && selectedCheckbox ? <button className='text-white bg-yellow-500 border border-yellow-600 rounded-md px-4 py-2 ml-4 hover:bg-yellow-600'
                                    onClick={updateProduct}  >Update</button> :
                                    <button className='text-white bg-blue-500 border border-blue-600 rounded-md px-4 py-2 ml-4 hover:bg-blue-600'
                                        onClick={() => editProduct(selectedCheckbox)}  >Edit</button>
                            }
                            <Link to={"/admin/add-product"} >  <button className='text-white bg-green-500 border border-green-600 rounded-md px-2 py-2 ml-4 hover:bg-green-600' >Add Product</button></Link>
                        </div>
                    </div>
                    <div>

                        {isLoading ?
                            <div className='w-full h-[20rem] flex justify-center items-center' > <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperclassName="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /></div> :
                            <table style={{ marginTop: "20px" }} className='font-semibold'  >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>PRODUCT NAME</th>
                                        <th>PRODUCT PICTURE</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>STOCK</th>
                                        <th>VENDOR</th>
                                        <th>PUBLISHED ON</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {filteredProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td><input type="checkbox"
                                                className='cursor-pointer'
                                                onChange={() => handleCheckboxChange(product._id)}
                                                id={`checkbox-${product._id}`}
                                                checked={selectedCheckbox === product._id}
                                            />
                                            </td>
                                            <td> <Link> {product.title.slice(0, 15)}...</Link></td>
                                            <td>  {isLoading ? <ColorRing
                                                visible={true}
                                                height="80"
                                                width="80"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperclassName="blocks-wrapper"
                                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                            /> : <img src={product.picture} alt="product_image" />} </td>
                                            {editMode && selectedCheckbox === product._id ? <td className='px-[1px]'><input type="number" min={1} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='price' className='w-[5rem] px-[4px] h-[40px] rounded-md bg-slate-700 text-white outline-none' /></td> : <td  >${product.price}</td>}
                                            {editMode && selectedCheckbox === product._id ? <td className='px-[1px]'><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='category' className='w-[10rem] px-[4px] h-[40px] rounded-md bg-slate-700 text-white outline-none' /></td> : <td>{product.category}</td>}
                                            {editMode && selectedCheckbox === product._id ? <td className='px-[1px]'><input type="number" min={1} value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} placeholder='stock' className='w-[5rem] px-[4px] h-[40px] rounded-md bg-slate-700 text-white outline-none' /></td> : <td>{product.stockQuantity}</td>}
                                            {editMode && selectedCheckbox === product._id ? <td className='px-[1px]'><input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder='vendor' className='w-[10rem] px-[4px] h-[40px] rounded-md bg-slate-700 text-white outline-none' /></td> : <td>{product.vendor}</td>}
                                            <td>{product.publishedDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                    </div>
                </div>
                <div className="footer">
                    <AdminFooter />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default ListProduct;
