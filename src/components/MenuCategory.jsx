import React from 'react'
import ProductList from './ProductList';

export default function MenuCategory(props) {
    const {category}=props;
    console.log(props)

    return (
        <div>
            <h4>{category.name}</h4>
            <ProductList {...props}/>

        </div>
    )
}
