import React, { useState, useContext } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";

// Icons
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// custom imports
import { Context } from "../Context";

export default function Profile() {
  const { currentUser, randomColor } = useContext(Context);
  const { cart, favorites } = currentUser;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        {currentUser?.id ? (
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Badge
              badgeContent={cart?.length + favorites?.length}
              color="secondary"
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                style={{ backgroundColor: randomColor }}
                src={currentUser.thumbnail}
              >
                {!currentUser.thumbnail && currentUser.firstName[0]}
              </Avatar>
            </Badge>
          </IconButton>
        ) : (
          <Link to="/login" className="flex gap-x-2 text-white">
            <LoginIcon />
            <h1 className="text-md font-semibold">Login</h1>
          </Link>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link to="/profile" className="flex items-center">
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <h1>Profile</h1>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/cart" className="flex items-center">
            <ListItemIcon>
              <Badge badgeContent={cart?.length} color="primary">
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </ListItemIcon>
            <h1>Cart</h1>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/favorites" className="flex items-center">
            <ListItemIcon>
              <Badge badgeContent={favorites?.length} color="primary">
                <FavoriteIcon fontSize="small" />
              </Badge>
            </ListItemIcon>
            <h1>Favorites</h1>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/logout" className="flex items-center">
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <h1>Logout</h1>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
