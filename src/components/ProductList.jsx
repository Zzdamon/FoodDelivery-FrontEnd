import React from 'react';
import ProductItem from './ProductItem/ProductItem';

function ProductList(props) {
    const { items,category } = props;

    return (
        <div className="container">
            { items.map((item) => {
                if(item.categId===category.categId)
                return <ProductItem
                    {...item}
                    restaurant={props.restaurant}
                    key={item.itemId}
                />
            })}
        </div>
    );
}

export default ProductList;