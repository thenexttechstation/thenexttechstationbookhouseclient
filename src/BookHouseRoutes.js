import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./bookhouseuser/Register";
import Login from "./bookhouseuser/Login";
import SocialLogin from "./bookhouseuser/SocialLogin";
import Home from "./bookhousecore/Home";
import PrivateRoute from "./bookhouseapi/PrivateRoute";
import AdminRoute from "./bookhouseapi/AdminRoute";

import BookhouseUserDashboard from "./bookhouseuser/BookhouseUserDashboard";
import BookhouseSocialUserDashboard from "./bookhouseuser/BookhouseSocialUserDashboard";
import AdministratorDashboard from "./bookhouseuser/AdministratorDashboard";
import CreateCategory from "./bookhouseadmin/CreateCategory";
import CreateProduct from "./bookhouseadmin/CreateProduct";
import SocialUserRoute from "./bookhouseapi/SocialUserRoute";
import BookHouseError from "./bookhousecore/BookHouseError";
import BookShop from "./bookhousecore/BookShop";
import ProductDetails from "./bookhousecore/ProductDetails";
import BookHouseCart from "./bookhousecore/BookHouseCart";
import Orders from "./bookhouseadmin/BookHouseOrder";
import BookHouseProfile from "./bookhouseuser/BookHouseProfile";
import BookHouseManageProducts from "./bookhouseadmin/BookHouseManageProducts";
import ModifyProduct from "./bookhouseadmin/ModifyProduct";
import SearchComponent from "./bookhousecore/SearchComponent";
import EditorspickComponent from "./bookhousecore/EditorspickComponent";
import CarousalComponent from "./bookhousecore/CarousalComponent";
import MobileAuthComponent from "./bookhousecore/MobileAuthComponent";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/sociallogin" exact component={SocialLogin} />
        <Route path="/bookshop" exact component={BookShop} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute
          path="/bookhouseuser/dashboard"
          exact
          component={BookhouseUserDashboard}
        />
        <PrivateRoute
          path="/profile/:bookhouseuserId"
          exact
          component={BookHouseProfile}
        />
        <SocialUserRoute
          path="/bookhousesocialuser/dashboard"
          exact
          component={BookhouseSocialUserDashboard}
        />
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdministratorDashboard}
        />
        <AdminRoute path="/category/create" exact component={CreateCategory} />
        <AdminRoute path="/product/create" exact component={CreateProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute
          path="/admin/manageproducts"
          exact
          component={BookHouseManageProducts}
        />
        <AdminRoute
          path="/admin/product/update/:bookhouseproductId"
          exact
          component={ModifyProduct}
        />
        <Route
          path="/product/:bookhouseproductId"
          exact
          component={ProductDetails}
        />
        <Route path="/cart" exact component={BookHouseCart} />
        <Route path="/search" exact component={SearchComponent} />
        <Route path="/editorspick" exact component={EditorspickComponent} />
        <Route path="/catalog" exact component={CarousalComponent} />
        <Route path="/mobileauth" exact component={MobileAuthComponent} />
        mobileauth
        <Route path="*" component={BookHouseError} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
