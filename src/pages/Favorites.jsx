import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Rating } from "@mui/material";

import { Context } from "../Context";

export default function Favorites() {
  const { currentUser, setCurrentUser } = useContext(Context);
  const { favorites } = currentUser;
  return (
    <>
      {!currentUser.id ? (
        <Redirect to="/login" />
      ) : (
        <div className="flex flex-col items-center w-4/5 mx-auto">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-x-14 md:gap-x-24 py-10"
              >
                <img src={item.image} alt={item.title} style={{ width: 160 }} />
                <div className="flex flex-col gap-y-5 w-[300px]">
                  <h1 className="text-xl font-bold">{item.title}</h1>
                  <div className="flex items-center gap-x-4">
                    <Rating value={item.rating.rate} readOnly />
                    <p>•</p>
                    <p className="font-bold text-sm">{item.rating.count}</p>
                  </div>
                  <div className="flex gap-x-5 items-center">
                    <h1 className="font-bold text-lg">$ {item.price}</h1>
                    <button
                      className="text-sm font-bold px-2 py-1 bg-blue-500 hover:bg-blue-800 text-white rounded-md shadow-md"
                      onClick={() => {
                        const newFav = favorites.filter(
                          (itm) => itm.id !== item.id
                        );
                        setCurrentUser((prevData) => ({
                          ...prevData,
                          cart: [...prevData.cart, { ...item, count: 1 }],
                          favorites: newFav,
                        }));
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-3xl font-bold flex justify-center mt-24">
              Favorites is empty !!!
            </h1>
          )}
        </div>
      )}
    </>
  );
}
