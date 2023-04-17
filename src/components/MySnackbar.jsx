import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function MySnackbar({ msg, type = "success" }) {
  const [open, setOpen] = useState(true);

  function handleClose(e, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key={"bottom" + "right"}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
