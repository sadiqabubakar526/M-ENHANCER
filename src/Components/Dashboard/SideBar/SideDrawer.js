import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  HomeOutlined as HomeIcon,
  SearchOutlined as SearchIcon,
  InfoOutlined as InfoIcon,
  MenuOutlined as MenuIcon,
  AlarmOutlined as AlarmIcon,
  AccountCircleOutlined as AccountCircle,
  FavoriteBorderOutlined as FavoriteBorderIcon,
  Mood as MoodIcon,
} from "@material-ui/icons";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Profile from "../../Common/Profile/Profile";

const useStyles = makeStyles((theme) => ({
  privacy: {
    marginTop: "150px",
    fontSize: "13px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginTop: "92px",
    },
  },
  iconColor: {
    color: theme.palette.primary.contrastText,
  },
}));

const SideDrawer = ({ selectedMenuItem, privacy }) => {
  const classes = useStyles();
  const theme = useTheme();

  const itemList = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "Browse",
      icon: <SearchIcon />,
    },
//     {
//       text: "Mood Enhancer",
//       icon: <MoodIcon />,
//     },
    {
      text: "Your Library",
      icon: <InfoIcon />,
    },
    {
      text: "Recent Played",
      icon: <AlarmIcon />,
    },
    {
      text: "Liked Songs",
      icon: <FavoriteBorderIcon />,
    },
  ];

  return (
    <div>
      <Profile />
      <Divider />
      <List>
        {itemList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={() => selectedMenuItem(text)}>
              {icon && (
                <ListItemIcon className={classes.iconColor}>
                  {icon}
                </ListItemIcon>
              )}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
      <a>
        <center>
          <Typography
            onClick={() => {
              privacy("Privacy & Policy");
            }}
            className={classes.privacy}
          >
            Privacy & Policy
          </Typography>
        </center>
      </a>
    </div>
  );
};

export default SideDrawer;
