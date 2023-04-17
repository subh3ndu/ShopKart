import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";

import Profile from "./Profile";
import { Context } from "../Context";

export default function Header() {
  const { setSearch, shopData } = useContext(Context);
  const searchData = shopData.map((item) => ({
    id: item.id,
    label: item.title,
  }));

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <header className="flex h-20 bg-blue-500 items-center justify-between px-12 shadow-md sticky top-0 z-10">
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-white">ShopKart</h1>
        </Link>
        <div className="flex items-center">
          <Autocomplete
            freeSolo
            disableClearable
            size="small"
            color="primary"
            options={searchData}
            sx={{ width: 240, color: "white" }}
            renderInput={(params) => (
              <TextField
                className="text-white"
                variant="standard"
                {...params}
                label="Search here..."
                onSelect={handleChange}
              />
            )}
          />
          <Profile />
        </div>
      </header>
    </>
  );
}
