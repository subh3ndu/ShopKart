import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Logout() {
  useEffect(() => {
    localStorage.setItem("current-user", JSON.stringify({}));
    location.reload();
  }, []);

  return (
    <div>
      <Redirect to="/" />
    </div>
  );
}
