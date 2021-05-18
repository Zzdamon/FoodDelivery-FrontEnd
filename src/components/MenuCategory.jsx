import React from 'react'
import ProductList from './ProductList';

export default function MenuCategory(props) {
    const {category}=props;
    console.log(props)

    return (
        <div className="container d-flex flex-column align-items-lg-center justify-content-lg-center">
            <div className="my-3 border-bottom border-dark">

            <h3 className="text-center">{category.name}</h3>
            </div>
            <ProductList {...props}/>

        </div>
    )
}
