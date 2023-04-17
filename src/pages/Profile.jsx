import React, { useRef, useEffect, useContext, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import ProfileDetails from "../components/ProfileDetails";
import { Context } from "../Context";

export default function Profile() {
  const imageUploader = useRef();
  const { currentUser, setCurrentUser, randomColor } = useContext(Context);
  const [image, setImage] = useState(currentUser.thumbnail || null);

  useEffect(() => {
    setImage(currentUser.thumbnail);
  }, [currentUser.thumbnail]);

  function handleImageUpload(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      setCurrentUser((prevData) => ({ ...prevData, thumbnail: reader.result }));
    });

    return () => {
      reader.removeEventListener(() => {
        setCurrentUser((prevData) => ({
          ...prevData,
          thumbnail: reader.result,
        }));
      });
    };
  }

  return (
    <>
      {!currentUser.id ? (
        <Redirect to="/login" />
      ) : (
        <div className="sm:w-full lg:w-3/5 lg:mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            className="hidden"
          />
          <div className="w-4/5 mx-auto mt-10 flex gap-x-24">
            <div className="flex flex-col items-end">
              <div className="relative">
                <Tooltip title="Click to upload new picture">
                  <div
                    className="w-44 h-44 rounded-full cursor-pointer"
                    style={{ backgroundColor: randomColor }}
                    onClick={() => imageUploader.current.click()}
                  >
                    {image ? (
                      <img
                        src={image}
                        className="w-44 h-44 rounded-full object-cover"
                      />
                    ) : (
                      <h1 className="text-center text-8xl pt-10 font-bold text-white">
                        {currentUser.firstName[0] + currentUser.lastName[0]}
                      </h1>
                    )}
                  </div>
                </Tooltip>
                <div className="absolute bottom-0 right-0">
                  <IconButton
                    onClick={() =>
                      setCurrentUser((prev) => ({ ...prev, thumbnail: null }))
                    }
                  >
                    {currentUser.thumbnail && <DeleteIcon />}
                  </IconButton>
                </div>
              </div>
            </div>
            <ProfileDetails />
          </div>
        </div>
      )}
    </>
  );
}
