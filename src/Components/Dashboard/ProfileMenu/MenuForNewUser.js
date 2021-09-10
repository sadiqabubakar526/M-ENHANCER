import React from "react";
import { MenuItem, Menu } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  menuItemLink: {
    color: "white",
    textDecoration: "none",
  },
}));

const MenuForNewUser = ({ menuId, anchorEl, isMenuOpen, handleMenuClose }) => {
  //Render menu for new users
  const classes = useStyles();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/signup" className={classes.menuItemLink}>
          Sign Up
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login" className={classes.menuItemLink}>
          Log In
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default MenuForNewUser;
