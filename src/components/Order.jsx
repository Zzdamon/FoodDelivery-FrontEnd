import React from 'react'
import OrderProduct from './OrderProduct'

export default function Order(props) {
    let total=0;
    return (
        <div className="container-min-max-width d-flex flex-column ml-4">
            <h5 className="mb-3">{props.order.date}</h5>
            {props.order.products.map(product=>{
                total+=product.price*product.quantity;
                return <OrderProduct product={product} /> })
            
            }
            <div className="mr-2 mt-2 d-flex justify-content-end border-top">
                <h5>Total: {total} {props.order.products[0].currency}</h5>
            </div>
        </div>
    )
}
