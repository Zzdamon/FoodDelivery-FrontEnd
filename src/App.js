import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login/Login';
import Page404 from './pages/Page404';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart/Cart';
import './utils/utility-classes.css';
import Product from './pages/Product/Product';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';
import Category from './pages/Category'


function App() {
  return(
    <div className="app">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route path="/category/:category" component={Category}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/my-account" component={MyAccount}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/favourites" component={Favourites}/>
        <Route path="/restaurant/:categoryName" component={Restaurant}/>
        <Route path="/product/:productId" component={Product}/>
        <Route path="*" component={Page404}/>
      </Switch>
    </div>
  );
}

export default App;
