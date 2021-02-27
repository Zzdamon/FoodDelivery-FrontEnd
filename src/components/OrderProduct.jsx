import React from 'react'

export default function OrderProduct(props) {
    return (
        <div className="container-min-max-width d-flex">
            <div className="d-flex ">
                <img id="order-prod-img" src={props.product.image} alt="product image" srcset=""/>
            </div>
            <div>
                <h5>{props.product.name}</h5>
                <h6>{props.product.price + props.product.currency}</h6>
                <h6>quantity: {props.product.quantity}</h6>

            </div>
        </div>
    )
}
