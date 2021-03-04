import React, { Component } from 'react'

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
         fetch(`http://localhost:5000/api/restauranttags/${match.params.category.replace("_"," ")}`)
         .then(restaurants=>restaurants.json())
         .then(restaurants=>{
            console.log(restaurants) 
            this.setState({restaurants:restaurants})
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
