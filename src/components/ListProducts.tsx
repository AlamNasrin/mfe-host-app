import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {Product} from '../model/Product';
import './ListProducts.css'
import {useNavigate} from 'react-router-dom';
import ProductView from "./ProductView";
import {useSelector} from 'react-redux';
import { AuthState } from "../redux/authReducer";


//const baseUrl = "http://localhost:9000/products";
const baseUrl = "http://localhost:9000/secure_products";



function ListProducts(){

    const [products, setProducts] = useState<Array<Product>>([]);
    const [isDescVisible, setDescVisible] = useState(false);
    const navigate = useNavigate();
    //subscribe to redux;
    const auth = useSelector((state: any) => state.auth) as AuthState;


    useEffect(() => {

        fetchProducts();
    }, []);

    async function fetchProducts(){

        try {
            
            //const headers = {Authorization: `Bearer ${auth.accessToken}`};
            //const response = await axios.get<Array<Product>>(baseUrl, {headers});
            const response = await axios.get<Array<Product>>(baseUrl);
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log("fetchProducts error: ", error);
        }
    }

    const deleteProduct=useCallback( async (product: Product)=>{

        try {
            
            const url = `${baseUrl}/${product.id}`;
            await axios.delete(url);
           // fetchProducts();
            const copy_of_products = [...products];
            const index = copy_of_products.findIndex(item => item.id === product.id);
            if(index !== -1){
                copy_of_products.splice(index, 1);
                setProducts(copy_of_products);
            }
            alert(`product with id: ${product.id} deleted`)
        } catch (error) {
            alert(`product with id: ${product.id} not found`)
        }
    }, [products])


    const editProduct =useCallback( (product: Product)=>{

        navigate("/products/" + product.id);
    }, [])

    const calcPrices  = useMemo( () => {

        console.log("in calcPrices")
        let totalPrice = 0
        products.forEach(product => {
            if(product.price)
            totalPrice += product.price
        })
        return totalPrice;
    }, [products]);

    return(
        <div>
            <h4>List Products</h4>
            <p>Total prices(useMemo): {calcPrices}</p>
            { isDescVisible ? <p>This is a demo on react components optimization</p>: null}
            <button className="btn btn-warning" 
                    onClick={() => setDescVisible(!isDescVisible)}>Toggle Desc</button>

            <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
                {products.map((product) => {
                    return (

                        <ProductView product={product} key={product.id} 
                                            onDelete={deleteProduct} onEdit={editProduct}/>
                        // <div className="product" key={product.id}>
                        //     <p>Id: {product.id}</p>
                        //     <p>Name: {product.name}</p>
                        //     <p>{product.description}</p>
                        //     <p>{product.price}</p>
                        //     <div>
                        //         <button className="btn btn-danger" 
                        //                     onClick={() => {deleteProduct(product)}}>Delete</button>&nbsp;
                        //         <button className="btn btn-warning"
                        //                     onClick={() => editProduct(product)}>Edit</button>
                        //     </div>

                        // </div>
                    )
                })}
            </div>
           
        </div>
    )
}

export default ListProducts;