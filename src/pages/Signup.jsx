import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Link, Redirect } from "react-router-dom";
import { Checkbox, TextField, FormControlLabel, Snackbar } from "@mui/material";

import { Context } from "../Context";
import MySnackbar from "../components/MySnackbar";

export default function Signup() {
  const [newUserData, setNewUserData] = useState({
    id: uuid(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    thumbnail: null,
    defaultAddress: {},
    cart: [],
    favorites: [],
    addresses: [],
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState(false);

  const { setAllUsers, setAlert } = useContext(Context);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(error, newUserData);

    const { firstName, lastName, email, password, confirmPassword } =
      newUserData;

    !firstName
      ? setError((prevErrors) => ({ ...prevErrors, firstName: "*required" }))
      : setError((prevErrors) => ({ ...prevErrors, firstName: "" }));

    !lastName
      ? setError((prevErrors) => ({ ...prevErrors, lastName: "*required" }))
      : setError((prevErrors) => ({ ...prevErrors, lastName: "" }));

    !email
      ? setError((prevErrors) => ({ ...prevErrors, email: "*required" }))
      : setError((prevErrors) => ({ ...prevErrors, email: "" }));

    !password
      ? setError((prevErrors) => ({ ...prevErrors, password: "*required" }))
      : setError((prevErrors) => ({ ...prevErrors, password: "" }));

    !(password === confirmPassword)
      ? setError((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "passwords did not matched !!!",
        }))
      : setError((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
        }));

    if (
      newUserData.firstName &&
      newUserData.lastName &&
      newUserData.email &&
      newUserData.password &&
      newUserData.confirmPassword &&
      newUserData.password === newUserData.confirmPassword
    ) {
      setAllUsers((prevUserData) => [...prevUserData, newUserData]);
      setNewUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setAlert(<MySnackbar msg="User Created Successfully" />);
      setRedirect(true);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  }

  return (
    <>
      {redirect && <Redirect to="/login" />}
      <div className="flex justify-center items-center h-[100vh]">
        <div className="shadow-md rounded-md px-10 py-8">
          <h1 className="text-2xl font-bold text-center mb-4">Sign up</h1>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-x-4">
              <TextField
                error={error.firstName ? true : false}
                type="text"
                label="First Name"
                name="firstName"
                value={newUserData.firstName}
                onChange={handleChange}
                helperText={error.firstName}
                autoComplete="off"
              />
              <TextField
                error={error.lastName ? true : false}
                type="text"
                label="Last Name"
                name="lastName"
                value={newUserData.lastName}
                onChange={handleChange}
                helperText={error.lastName}
                autoComplete="off"
              />
            </div>
            <TextField
              error={error.email ? true : false}
              type="email"
              label="Email"
              name="email"
              value={newUserData.email}
              onChange={handleChange}
              helperText={error.email}
              autoComplete="off"
            />
            <TextField
              error={error.password ? true : false}
              type="password"
              label="Password"
              name="password"
              value={newUserData.password}
              onChange={handleChange}
              helperText={error.password}
              autoComplete="off"
            />
            <TextField
              error={error.confirmPassword ? true : false}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={newUserData.confirmPassword}
              onChange={handleChange}
              helperText={error.confirmPassword}
              autoComplete="off"
            />
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <button className="bg-blue-500 py-3 rounded-md text-white font-semibold hover:bg-blue-800 hover:shadow-lg">
              Sign up
            </button>
          </form>
          <h6 className="text-sm text-center mt-4">
            Existing User ? Consider{" "}
            <span className="underline font-bold">
              <Link to="/login">Log in</Link>
            </span>
          </h6>
        </div>
      </div>
    </>
  );
}
