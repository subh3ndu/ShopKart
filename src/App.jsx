import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import { Context } from "./Context";
import Header from "./components/Header";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ProductItem from "./pages/ProductItem";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import Success from "./pages/Success";
import BuyNow from "./pages/BuyNow";

function App() {
  const { alert } = useContext(Context);

  return (
    <div className="App">
      {alert}
      <Switch>
        <Route exact path="/">
          <Header />
          <Products />
        </Route>
        <Route exact path="/products/:productId">
          <Header />
          <ProductItem />
        </Route>
        <Route path="/products/:productId/buy">
          <Header />
          <BuyNow />
        </Route>
        <Route path="/cart">
          <Header />
          <Cart />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route path="/favorites">
          <Header />
          <Favorites />
        </Route>
        <Route path="/success">
          <Header />
          <Success />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
