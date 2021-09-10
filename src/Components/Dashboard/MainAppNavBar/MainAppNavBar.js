import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import AppNavBar from "../AppBar/AppNavBar";
import HideDrawer from "../NavWithHiddenDrawer/HideDrawer";
import MenuForExistingUser from "../ProfileMenu/MenuForExistingUser";
import MenuForNewUser from "../ProfileMenu/MenuForNewUser";

const MainAppNavBar = ({
  state,
  handleSearch,
  menuId,
  selectedMenuItem,
  privacy,
  themeToggler,
  themeHandler,
}) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <>
      <AppNavBar
        menuId={menuId}
        state={state}
        handleDrawerToggle={handleDrawerToggle}
        handleSearch={handleSearch}
        handleProfileMenuOpen={handleProfileMenuOpen}
        themeHandler={themeHandler}
        themeToggler={themeToggler}
      />

      {user ? (
        <MenuForExistingUser
          menuId={menuId}
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
        />
      ) : (
        <MenuForNewUser
          menuId={menuId}
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
        />
      )}

      <HideDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedMenuItem={selectedMenuItem}
        privacy={privacy}
      />
    </>
  );
};

export default MainAppNavBar;
