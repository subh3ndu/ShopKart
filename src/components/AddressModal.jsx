import React, { useState, useContext } from "react";
import { Autocomplete, Modal, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";

import { Context } from "../Context";

export default function AddressModal({ state }) {
  const [newAddress, setNewAddress] = useState({
    id: uuid(),
    address: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  });
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const { openModal, setOpenModal } = state;
  const { statesAndCities, setCurrentUser } = useContext(Context);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewAddress((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddress],
    }));
    setOpenModal(false);
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white p-5 rounded-md  flex flex-col gap-y-5">
          <h1 className="font-bold text-2xl text-center">Add a New Address</h1>
          <TextField
            label="Address (area and street)"
            multiline
            rows={4}
            name="address"
            value={newAddress.address}
            onChange={handleChange}
          />
          <div className="flex gap-x-5">
            <Autocomplete
              options={statesData}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="state"
                  label="States"
                  onSelect={(e) => {
                    handleChange(e);
                    setStatesData(
                      statesAndCities.map((item, ind) => ({
                        id: ind,
                        label: item.state,
                      }))
                    );
                  }}
                />
              )}
            />
            <Autocomplete
              options={citiesData}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City/Districts/States"
                  name="city"
                  value={newAddress.city}
                  onSelect={(e) => {
                    handleChange(e);
                    const currentState = statesAndCities.find(
                      (item) => item.state === newAddress.state
                    );
                    // const { districts } = currentState;
                    setCitiesData(
                      currentState
                        ? currentState.districts.map((item) => ({
                            label: item,
                          }))
                        : []
                    );
                  }}
                />
              )}
            />
          </div>
          <div className="flex gap-x-5">
            <TextField
              label="Landmark(Optional)"
              name="landmark"
              value={newAddress.landmark}
              onChange={handleChange}
            />
            <TextField
              label="Pincode"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-900 text-white font-bold text-sm rounded-md shadow-md py-2"
            onClick={handleSubmit}
          >
            Add address
          </button>
        </div>
      </Modal>
    </div>
  );
}
