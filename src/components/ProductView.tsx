// <ProductView product={prd}/>

import React from "react";
import { Product } from "../model/Product";

type ProductViewProps = {
    product: Product;
    onDelete: (product: Product) => void;
    onEdit: (product: Product) => void;

}


//React.memo is a higher order component 
//that will prevent a functional component from rendering if its props have not changed.
// Its gets rerendered only if the props or its state changes
const ProductView : React.FC<ProductViewProps> =React.memo(({product, onDelete, onEdit}) => {

    console.log("ProductView rendering " + product.name);

    return (
        <div className="product">
            <p>Id: {product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <div>
                <button className="btn btn-danger" onClick={() => onDelete(product)}>Delete</button>&nbsp;
                <button className="btn btn-warning" onClick={() => onEdit(product)}>Edit</button>
            </div>
        </div>
    )
})

export default ProductView;