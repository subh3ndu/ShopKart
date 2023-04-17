import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField } from "@mui/material";

import { Context } from "../Context";
import MySnackbar from "../components/MySnackbar";

export default function Signup() {
  const [currentUserData, setCurrentUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const { allUsers, setCurrentUser, setAlert } = useContext(Context);

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = currentUserData;

    !email
      ? setError((prevErrors) => ({ ...prevErrors, email: "*required" }))
      : setError((prevErrors) => ({ ...prevErrors, email: "" }));

    !password
      ? setError((prevErrors) => ({ ...prevErrors, password: "*required" }))
      : setError((prevErrors) => ({ ...prevErrors, password: "" }));

    const findUser = allUsers?.find(
      (userData) =>
        userData.email === currentUserData.email &&
        userData.password === currentUserData.password
    );

    if (currentUserData.email && currentUserData.password) {
      if (findUser) {
        setCurrentUser(findUser);
        setCurrentUserData({
          email: "",
          password: "",
        });
        setAlert(<MySnackbar msg="Logged in successfully" />);
        setRedirect(true);
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          password: "email or password did not match",
        }));
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCurrentUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  }

  return (
    <>
      {redirect && <Redirect to="/" />}
      <div className="flex justify-center items-center h-[100vh]">
        <div className="shadow-md rounded-md px-10 py-8">
          <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>
          <form className="flex flex-col gap-y-4 w-96" onSubmit={handleSubmit}>
            <TextField
              error={error.email ? true : false}
              type="email"
              label="Email"
              name="email"
              value={currentUserData.email}
              onChange={handleChange}
              helperText={error.email}
              autoComplete="off"
            />
            <TextField
              error={error.password ? true : false}
              type="password"
              label="Password"
              name="password"
              value={currentUserData.password}
              onChange={handleChange}
              helperText={error.password}
              autoComplete="off"
            />
            <button className="bg-blue-500 py-3 rounded-md text-white font-semibold hover:bg-blue-800 hover:shadow-lg">
              Log in
            </button>
          </form>
          <h6 className="text-sm text-center mt-4">
            New User ? Consider{" "}
            <span className="underline font-bold">
              <Link to="/signup">Create account</Link>
            </span>{" "}
            here
          </h6>
        </div>
      </div>
    </>
  );
}
