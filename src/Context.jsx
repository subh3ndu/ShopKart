import React, { useState, useEffect } from "react";
import randomHexColor from "random-hex-color";

export const Context = React.createContext();

export function ContextProvider({ children }) {
  const [shopData, setShopData] = useState(
    () => JSON.parse(localStorage.getItem("shop-data")) || []
  );
  const [allUsers, setAllUsers] = useState(
    () => JSON.parse(localStorage.getItem("all-users")) || []
  );
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("current-user")) || {}
  );
  const [statesAndCities, setStatesAndCities] = useState(
    JSON.parse(localStorage.getItem("states-cities")) || []
  );
  const [randomColor, setRandomColor] = useState(() => randomHexColor());
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem("shop-data", JSON.stringify(shopData));
  }, [shopData]);

  useEffect(() => {
    localStorage.setItem("current-user", JSON.stringify(currentUser));
    currentUser.id &&
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === currentUser.id ? currentUser : user
        )
      );
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("all-users", JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem("state-cities", JSON.stringify(statesAndCities));
  }, [statesAndCities]);

  useEffect(() => {
    const URL = "https://fakestoreapi.com/products/";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setShopData(data));

    const URL2 =
      "https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json";
    fetch(URL2)
      .then((res) => res.json())
      .then((data) => setStatesAndCities(data.states));
  }, []);

  return (
    <Context.Provider
      value={{
        shopData,
        allUsers,
        setAllUsers,
        currentUser,
        setCurrentUser,
        alert,
        setAlert,
        search,
        setSearch,
        randomColor,
        statesAndCities,
      }}
    >
      {children}
    </Context.Provider>
  );
}
