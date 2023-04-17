import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { Context } from "../Context";

export default function Cart() {
  const { currentUser, setCurrentUser } = useContext(Context);
  const { cart } = currentUser;
  return (
    <>
      {!currentUser.id ? (
        <Redirect to="/login" />
      ) : (
        <div className="flex flex-col items-center w-4/5 mx-auto">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-x-14 md:gap-x-24 py-10"
              >
                <img src={item.image} alt={item.title} style={{ width: 160 }} />
                <div className="flex flex-col gap-y-5 w-[300px]">
                  <h1 className="text-xl font-bold">{item.title}</h1>
                  <div className="flex items-center gap-x-3">
                    <IconButton
                      onClick={() =>
                        setCurrentUser((prevData) => ({
                          ...prevData,
                          cart: prevData.cart.map((itm) =>
                            itm.id === item.id && itm.count > 1
                              ? { ...item, count: itm.count - 1 }
                              : itm
                          ),
                        }))
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <h1 className="font-bold text-lg">{item.count}</h1>
                    <IconButton
                      onClick={() =>
                        setCurrentUser((prevData) => ({
                          ...prevData,
                          cart: prevData.cart.map((itm) =>
                            itm.id === item.id
                              ? { ...item, count: itm.count + 1 }
                              : itm
                          ),
                        }))
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        const newCart = cart.filter(
                          (itm) => itm.id !== item.id
                        );
                        setCurrentUser((prevData) => ({
                          ...prevData,
                          cart: newCart,
                        }));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <h1 className="font-bold text-xl">
                    Price: $
                    {Math.round(
                      item.price * item.count * 1000 + Number.EPSILON
                    ) / 1000}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-3xl font-bold flex justify-center mt-24">
              Cart is empty !!!
            </h1>
          )}
          {cart.length > 0 && (
            <div className="flex gap-x-24 items-center mt-10">
              <h1 className="text-2xl font-bold">
                Total Price: $
                {Math.round(
                  cart.reduce((acc, cur) => {
                    return acc + cur.price * cur.count;
                  }, 0) *
                    1000 +
                    Number.EPSILON
                ) / 1000}
              </h1>
              <Link to="/success">
                <button className="text-md font-bold bg-blue-500 hover:bg-blue-800 px-4 py-2 rounded-md shadow-md text-white">
                  Check Out
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
