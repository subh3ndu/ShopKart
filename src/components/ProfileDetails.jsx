import React, { useContext, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import { Context } from "../Context";
import AddressModal from "../components/AddressModal";
import EditAddressModal from "../components/EditAddressModal";

export default function ProfileDetails() {
  const [edit, setEdit] = useState({
    personal: false,
    email: false,
    phone: false,
    password: false,
  });

  const { currentUser, setCurrentUser } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return (
    <div>
      <div>
        <div className="flex gap-x-2 items-center">
          {/* Personal Info */}
          <h1 className="text-xl font-bold">Personal Informations</h1>
          <IconButton
            onClick={() =>
              setEdit((prevData) => ({
                ...prevData,
                personal: !prevData.personal,
              }))
            }
          >
            {edit.personal ? <DoneIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="flex mt-8 gap-x-4">
          <TextField
            disabled={!edit.personal}
            label="First Name"
            value={currentUser.firstName}
            onChange={(e) =>
              setCurrentUser((prevData) => ({
                ...prevData,
                firstName: e.target.value,
              }))
            }
          />
          <TextField
            disabled={!edit.personal}
            label="Last Name"
            value={currentUser.lastName}
            onChange={(e) =>
              setCurrentUser((prevData) => ({
                ...prevData,
                lastName: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Email Info */}
      <div className="mt-4">
        <div className="flex gap-x-2 items-center">
          <h1 className="text-xl font-bold">Email Informations</h1>
          <IconButton
            onClick={(e) =>
              setEdit((prevData) => ({
                ...prevData,
                email: !prevData.email,
              }))
            }
          >
            {edit.email ? <DoneIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="flex mt-8 gap-x-4">
          <TextField
            disabled={!edit.email}
            label="Email Address"
            value={currentUser.email}
            onChange={(e) =>
              setCurrentUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Mobile Info */}
      <div className="mt-4">
        <div className="flex gap-x-2 items-center">
          <h1 className="text-xl font-bold">Mobile Informations</h1>
          <IconButton
            onClick={(e) =>
              setEdit((prevData) => ({
                ...prevData,
                phone: !prevData.phone,
              }))
            }
          >
            {edit.phone ? <DoneIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="flex mt-8 gap-x-4">
          <TextField
            disabled={!edit.phone}
            label="phone Number"
            value={currentUser.phone}
            onChange={(e) =>
              setCurrentUser((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="mt-4">
        <div className="flex gap-x-2 items-center">
          <h1 className="text-xl font-bold mt-10">Manage addresses</h1>
        </div>
        <div className="flex flex-col mt-8 gap-x-4 gap-y-4">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-md shadow-md"
              onClick={() => setOpenModal(true)}
            >
              Add New Address
            </button>
          </div>
          <div className="md:ml-8 mb-44 flex flex-col gap-y-6">
            {currentUser.addresses.length ? (
              currentUser.addresses.map((item, ind) => (
                <div
                  key={ind}
                  className={`border-2 p-6 rounded-md ${
                    item.id === currentUser.defaultAddress.id
                      ? "border-green-500"
                      : ""
                  }`}
                >
                  <h1 className="text-2xl font-bold capitalize">
                    {item.address}
                  </h1>
                  <p className="text-lg font-normal">{item.landmark}</p>
                  <div className="flex gap-x-1 font-normal text-sm">
                    <h2>{item.city},</h2>
                    <h2>{item.state},</h2>
                    <h2>{item.pincode}</h2>
                  </div>
                  <div className="flex mt-4 gap-x-4">
                    <button
                      className={`px-4 py-2 bg-green-500 hover:bg-green-900 font-bold text-sm rounded-md shadow-md text-white ${
                        item.id === currentUser.defaultAddress.id
                          ? "hidden"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentUser((prevData) => ({
                          ...prevData,
                          defaultAddress: item,
                        }));
                      }}
                    >
                      Make Default
                    </button>
                    <button
                      className="px-4 py-2 bg-slate-500 hover:bg-slate-900 font-bold text-sm rounded-md shadow-md text-white"
                      onClick={() => setEditModal(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 hover:bg-red-900 font-bold text-sm rounded-md shadow-md text-white"
                      onClick={() => {
                        const { addresses } = currentUser;
                        const newAddresses = addresses.filter(
                          (itm) => itm.id !== item.id
                        );
                        setCurrentUser((prevData) => ({
                          ...prevData,
                          addresses: newAddresses,
                        }));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="font-bold text-sm">No address found ...</h1>
            )}
          </div>
        </div>
        {openModal && <AddressModal state={{ openModal, setOpenModal }} />}
      </div>
    </div>
  );
}
