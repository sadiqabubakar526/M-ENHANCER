import React, { useContext } from "react";
import { MenuItem, Menu } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";

const useStyles = makeStyles((theme) => ({
  menuItemLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
}));

const MenuForExistingUser = ({
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
}) => {
  // Render menu for existing users
  const classes = useStyles();

  const { user, logout } = useContext(AuthContext);

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
        <Link to="/myAccount" className={classes.menuItemLink}>
          My Account
          {/* {user} */}
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login" className={classes.menuItemLink} onClick={logout}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default MenuForExistingUser;
