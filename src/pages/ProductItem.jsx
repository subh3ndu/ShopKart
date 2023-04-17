import React, { useState, useContext } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { Rating, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { Context } from "../Context";
import MySnackbar from "../components/MySnackbar";

export default function ProductItem() {
  const { productId } = useParams();
  const { shopData, currentUser, setCurrentUser, setAlert } =
    useContext(Context);
  const { cart, favorites } = currentUser;
  const item = shopData.find((itm) => itm.id == productId);

  const [cartIcon, setCartIcon] = useState(
    cart?.find((itm) => itm.id === item.id)
  );
  const [heartIcon, setHeartIcon] = useState(
    favorites?.find((itm) => itm.id === item.id)
  );
  const [redirect, setRedirect] = useState(false);

  function handleAddToCart() {
    if (!currentUser.id) {
      setAlert(
        <MySnackbar
          msg="You need to be logged in to able to perform this action."
          type="error"
        />
      );
      setRedirect(true);
      return;
    }

    const newCart = cart?.filter((itm) => itm.id !== item.id);
    setCartIcon((prev) => !prev);

    cartIcon
      ? setCurrentUser((prevData) => ({ ...prevData, cart: newCart }))
      : setCurrentUser((prevData) => ({
          ...prevData,
          cart: [...cart, { ...item, count: 1 }],
        }));
  }

  function handleAddToFavorite() {
    if (!currentUser.id) {
      setRedirect(true);
      setAlert(
        <MySnackbar
          msg="You need to be logged in to able to perform this action."
          type="error"
        />
      );
      return;
    }

    const newFav = favorites?.filter((itm) => itm.id !== item.id);
    setHeartIcon((prev) => !prev);

    heartIcon
      ? setCurrentUser((prevData) => ({ ...prevData, favorites: newFav }))
      : setCurrentUser((prevData) => ({
          ...prevData,
          favorites: [...favorites, item],
        }));
  }

  return (
    <>
      {redirect && <Redirect to="/login" />}
      <div className="flex justify-center items-center mt-40">
        <div className="flex items-center w-4/5 gap-x-12 lg:w-3/5">
          <img src={item.image} alt={item.title} style={{ width: 210 }} />
          <div className="flex flex-col gap-y-4">
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <p className="text-sm">{item.description}</p>
            <div className="flex items-center gap-x-4">
              <Rating value={item.rating.rate} readOnly />
              <p>•</p>
              <p className="font-bold text-sm">{item.rating.count}</p>
            </div>
            <h1 className="font-bold text-lg">$ {item.price}</h1>
            <div className="flex items-center gap-x-2">
              <Link to={`/products/${productId}/buy`}>
                <button className="font-bold text-md text-white bg-blue-500 py-2 px-4 rounded-md shadow-md hover:bg-blue-800">
                  Buy now
                </button>
              </Link>
              <IconButton onClick={handleAddToCart}>
                {cartIcon ? (
                  <ShoppingBagIcon color="success" />
                ) : (
                  <ShoppingBagIcon />
                )}
              </IconButton>
              <IconButton onClick={handleAddToFavorite}>
                {heartIcon ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
