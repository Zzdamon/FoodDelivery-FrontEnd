import React from 'react'
import Layout from './Layout/Layout'
import MenuCategory from './MenuCategory'
import ProductList from './ProductList'

export default function Menu(props) {
    return (
        <Layout>
            {props.categories.map(categ=>
                <MenuCategory category={categ}
                                items={props.items}
                                key={categ.categId} />  
            )}
        </Layout>
    )
}
