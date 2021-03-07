import React, { Component } from 'react'
import {fetchRestaurants} from '../apis/yEat/yeat';
import Restaurant from '../components/CategoryRestaurant';
import Layout from '../components/Layout/Layout';
import RestaurantList from '../components/RestaurantList';

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state={
            TagId: "",
            restaurants:[]
        }
    }
    

    componentDidMount(){
        const { match } = this.props;
        const category= match.params.category.replace("_"," ");

         fetchRestaurants(category)
         .then(restaurants => {
                console.log(restaurants) 
                this.setState({restaurants:restaurants})
            })
        .catch((error) => {
            console.error('Error:', error);
          });
         
    }

    render() {
        console.log(this.state.restaurants)
        return (
            <Layout>
                <h5>{this.props.match.params.category}</h5>
                <RestaurantList restaurants={this.state.restaurants} />
            </Layout>
        )
    }
}
