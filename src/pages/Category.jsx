import React, { Component } from 'react'
import {fetchRestaurants} from '../apis/yEat/yeat';

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
            <div>
                {this.state.restaurants.map(rest=>{
                    return <p>{rest.restaurant.name}</p>
                })}
            </div>
        )
    }
}
