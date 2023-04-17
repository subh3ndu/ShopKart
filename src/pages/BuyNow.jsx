import React, { useContext, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { Context } from "../Context";
import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddressModal from "../components/AddressModal";

const steps = ["Select Quantity", "Select Address", "Order Summary"];

export default function BuyNow() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { currentUser, setCurrentUser, shopData } = useContext(Context);
  const { productId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [editModa, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    ...shopData.find((item) => item.id == productId),
    count: 1,
  });

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="w-4/5 mx-auto mt-24">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 4, mb: 1, textAlign: "center" }}>
            Your Order has successfully placed ...
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </>
      ) : (
        <>
          <div className="flex justify-center mt-8">
            {activeStep === 0 && (
              <div className="flex items-center gap-x-24">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  style={{ width: 210 }}
                />
                <div className="flex flex-col gap-y-4">
                  <h1 className="font-bold text-lg">{currentItem.title}</h1>
                  <div className="flex gap-x-4 items-center">
                    <IconButton
                      onClick={() =>
                        setCurrentItem((prev) => ({
                          ...prev,
                          count: prev.count > 1 ? prev.count - 1 : prev.count,
                        }))
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <h1 className="font-bold">{currentItem.count}</h1>
                    <IconButton
                      onClick={() =>
                        setCurrentItem((prev) => ({
                          ...prev,
                          count: prev.count + 1,
                        }))
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <h1 className="font-bold text-lg">
                    Price: ${" "}
                    {Math.round(currentItem.price * currentItem.count * 100) /
                      100}
                  </h1>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div className="mt-4">
                <div className="flex flex-col gap-x-4 gap-y-4">
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-md shadow-md"
                      onClick={() => setOpenModal(true)}
                    >
                      Add New Address
                    </button>
                  </div>
                  <div className="md:ml-8 mb-8 flex flex-col gap-y-6">
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
                      <h1 className="font-bold text-sm">
                        No address found ...
                      </h1>
                    )}
                  </div>
                </div>
                {openModal && (
                  <AddressModal state={{ openModal, setOpenModal }} />
                )}
              </div>
            )}
            {activeStep === 2 && <div></div>}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Check out" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
