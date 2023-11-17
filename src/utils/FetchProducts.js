
import axios from "./AxiosConfiq"
const FetchProducts = async () => {
    try {
        const { data } = await axios.get("/api/customer/products");
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default FetchProducts;


