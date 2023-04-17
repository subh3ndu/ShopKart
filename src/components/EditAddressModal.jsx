import React from "react";
import { Autocomplete, Modal, TextField } from "@mui/material";

export default function EditAddressModal({ state, item }) {
  const { editModal, setEditModal } = state;

  console.log(item);

  return (
    <div>
      <Modal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <h1>Hello</h1>
      </Modal>
    </div>
  );
}
