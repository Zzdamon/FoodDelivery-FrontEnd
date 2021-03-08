import React, { Component } from 'react'
import {fetchMenuCategories,fetchItems, fetchRestaurantById} from '../apis/yEat/yeat'
import Menu from '../components/Menu';

export default class Restaurant extends Component {

    constructor(props){
        super(props);
        const { match } = this.props;
        const restId = match.params.restId;
        this.state={
            restId:restId,
            categories:[],
            items:[]
        }
    }


    async componentDidMount(){
       fetchRestaurantById(this.state.restId)
       .then(rest=>this.setState({restaurant:rest}))

        await fetchMenuCategories(this.state.restId)
        .then(categories=>{ 
            // console.log(categories);
            this.setState({categories:categories})});
  
        let categIds= this.state.categories.map(categ=>categ.categId);
        // console.log(categIds)

        fetchItems(categIds)
        .then(items=>{
            // console.log(items)
            this.setState({items:items})
        });
                    
    }

    render() {
        return (
            <div>
                <Menu categories = {this.state.categories}
                        items = {this.state.items} 
                        restaurant={this.state.restaurant}/>
            </div>
        )
    }
}
