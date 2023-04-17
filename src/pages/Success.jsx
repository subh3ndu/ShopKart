import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../Context";

export default function Favorites() {
  const { currentUser } = useContext(Context);
  return (
    <>
      {!currentUser.id ? (
        <Redirect to="/login" />
      ) : (
        <div className="flex justify-center mt-48">
          <h1 className="font-bold text-xl">
            Your order placed successfully, Thank you for Choosing{" "}
            <Link to="/" className="text-2xl text-blue-500">
              ShopKart
            </Link>{" "}
            !!!
          </h1>
        </div>
      )}
    </>
  );
}
