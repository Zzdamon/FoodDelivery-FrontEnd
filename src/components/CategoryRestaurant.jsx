import React, { Component } from 'react';
import Layout from './Layout/Layout';

import ProductList from './ProductList';
import { Link } from 'react-router-dom';

export default function Restaurant(props) {
    const {name,logo,minOrder,address,description,id} = props.restaurant;
    console.log(props)
    return (
        
        <Link to={`/Restaurant/${id}`} className="container d-flex m-2 p-0 border border-silver"
            >   <div className="d-flex align-items-center m-2">
                <img id="restLogo" src={logo}></img>
                </div>
                <div>
                    <h3>{name}</h3>
                    <h5>{description}</h5>
                    <h6>{address}</h6>
                    {/* <h6>Min Order: {minOrder}</h6> */}

                </div>
            
        </Link>
    )
}

