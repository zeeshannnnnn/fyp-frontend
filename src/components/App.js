import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import userDashboard from "./userDashboard";
import AdminDashboard from "./adminDashboard";
import AdminRoute from "./adminRoutes";
import UserRoute from "./userRoutes";
import UploadProduct from "./uploadProduct";
import UpdateProduct from "./updateProduct";
import UpdateCategory from "./updateCategory";
import DisplayProducts from "./DisplayProducts";
import DisplayCategory from "./DisplayCategory";
import GetCategory from "./getOnlyCategory";
import notFound from "./notFound";
import DisplayProd from "./displayProduct";
import DetailProductPage from "./DetailProductPage";
import CartContextProvider from "../contexts/CartContext";
import CartList from "./CartList";
import ViewOrder from "./ViewOrder";
import Order from "./Order";

const App = () => {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path="/home/item/itemDetail/:id"
            component={DetailProductPage}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/Items" component={DisplayProd} />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <UserRoute exact path="/user/dashboard" component={userDashboard} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <Route
            exact
            path="/admin/dashboard/DisplayProduct"
            component={DisplayProducts}
          />
          <Route exact path="/Cart/Items/Order" component={Order} />
          <Route exact path="/Cart/Items" component={CartList} />
          <AdminRoute
            exact
            path="/admin/dashboard/DisplayCategory"
            component={DisplayCategory}
          />
          <AdminRoute
            exact
            path="/admin/dashboard/uploadProduct"
            component={UploadProduct}
          />
          <AdminRoute
            exact
            path="/admin/dashboard/updateProduct/:id"
            component={UpdateProduct}
          />
          <AdminRoute
            exact
            path="/admin/dashboard/updateCategory/:id"
            component={UpdateCategory}
          />
          <AdminRoute
            exact
            path="/admin/dashboard/viewOrder"
            component={ViewOrder}
          />
          <AdminRoute exact path="/category" component={GetCategory} />
          <Route exact path="/notfound" component={notFound} />
          <Redirect to="/notfound" />
        </Switch>
      </BrowserRouter>
    </CartContextProvider>
  );
};

export default App;
