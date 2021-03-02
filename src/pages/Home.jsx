import React from 'react';
import Layout from '../components/Layout/Layout';
// import Homecategory from '../components/Homecategory';
import HomeCategory from '../components/HomeCategory';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
       fetch("http://localhost:5000/api/tags")
       .then(rest=> rest.json())
       .then(categories=>this.setState({categories:categories}));
    }

    render() {
        return(
            <Layout>
                <div className="container-fluid container-min-max-width">
                    <h3>What do you want to eat today?</h3>
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