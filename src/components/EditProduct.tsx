import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Product } from '../model/Product';
import axios from 'axios';

function EditProduct(){

    const [product, setProduct] = useState<Product>(new Product(0, "", 0, ""));
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        console.log("params", params);
        fetchProduct();

    }, [])

    async function fetchProduct(){

        try {
            const response = await axios.get<Product>(`http://localhost:9000/products/${params.id}`);
            setProduct(response.data);

        } catch (error) {
            console.log("fetchProduct error: ", error)
        }
    }

    function handleNameChange(evt: ChangeEvent<HTMLInputElement>){
        setProduct({...product, name: evt.target.value})
    }

    function handleChange(evt: ChangeEvent<HTMLInputElement>){

        const value = evt.target.value;
        const copy_of_product = {...product};

        if(evt.target.name === "price"){
            copy_of_product.price = Number(value);
        }
        else{
            // @ts-ignore
            copy_of_product[evt.target.name] = value;
        }
        setProduct(copy_of_product);

    }

    async function save(evt: MouseEvent<HTMLButtonElement>){

        evt.preventDefault();
        try {
            const url =  `http://localhost:9000/products/${product.id}`;
            await axios.put(url, product);
            navigate("/products");

        } catch (error) {
            alert("error in saving the product")
        }      
    }

    function cancel(){
        navigate("/products");
    }
    return(
        <div>
            <h4> Edit Product</h4>

            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" name="name" value={product.name} 
                                                            onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" id="price" name="price" value={product.price} 
                                                                onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" id="description" name="description" value={product.description} 
                                                                    onChange={handleChange}/>
                </div>
                <div>
                    <button type='submit' className='btn btn-primary' onClick={save}>Save</button>&nbsp;
                    <button type='button' className='btn btn-info' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    )

}
export default EditProduct;