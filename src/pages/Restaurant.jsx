import React, { Component } from 'react'
import {fetchMenuCategories,fetchItems} from '../apis/yEat/yeat'
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
                        items = {this.state.items} />
            </div>
        )
    }
}
