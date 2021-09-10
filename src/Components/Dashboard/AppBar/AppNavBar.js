import React from "react";
import { AppBar, IconButton, Toolbar, InputBase } from "@material-ui/core";
import {
  SearchOutlined as SearchIcon,
  MenuOutlined as MenuIcon,
  AccountCircleOutlined as AccountCircle,
  Brightness7 as Brightness7Icon,
  Brightness4 as Brightness4Icon,
} from "@material-ui/icons";

import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import PhotoTaker from "../../Common/FaceCapture/PhotoTaker";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex: "1",
    background: theme.palette.primary.light,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      marginRight: 0,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  brightness: {
    marginRight: "2rem",
    cursor: "pointer",
  },
}));

const AppNavBar = ({
  state,
  menuId,
  handleDrawerToggle,
  handleSearch,
  handleProfileMenuOpen,
  themeToggler,
  themeHandler,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {/* search start */}
        {state === "Browse" ? (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Songs ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </div>
        ) : null}
        {/* search end */}
        {/* <PhotoTaker /> */}
        {/* {state === "Mood Enhancer" ? <PhotoTaker /> : state} */}
        <div className={classes.grow} />
        {themeToggler ? (
          <div className={classes.brightness} onClick={themeHandler}>
            <h1>{themeToggler}</h1>
            <Brightness7Icon />
          </div>
        ) : (
          <div className={classes.brightness} onClick={themeHandler}>
            <Brightness4Icon />
          </div>
        )}

        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
