import React from 'react';
import Layout from '../components/Layout/Layout';
// import Homecategory from '../components/Homecategory';
import HomeCategory from '../components/HomeCategory';
import {fetchCategories} from '../apis/yEat/yeat';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

     fetchCategoriesToState=()=>{
         fetchCategories()
        .then(categories=>this.setState({categories:categories}))
        .catch((error) => {
            console.error('Error:', error);
          });
    }

    componentDidMount() {
        this.fetchCategoriesToState();
       
    }

    render() {
        return(
            <Layout>
                <div className="container-fluid container-min-max-width">
                    <h3 className="my-2 text-center">What do you want to eat today?</h3>
                    <div className="row">
                        {this.state.categories.map((category) =>
                            <HomeCategory
                                key={category.id}
                                route={category.tagId}
                                name={category.tagId}
                                description={category.description}
                                image={category.banner}
                            />
                        )}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Home;