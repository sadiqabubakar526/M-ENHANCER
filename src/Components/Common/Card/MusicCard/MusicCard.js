import React from "react";
import { makeStyles, CardMedia, Grid, Box, Card } from "@material-ui/core";
import LikeSong from "./LikeSong/LikeSong";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card: {
    width: "180px",
    height: "265px",
    padding: "15px",
    borderRadius: "10px",
    background: theme.palette.grey[50],

    "&:hover": {
      background: theme.palette.primary.dark,
      transform: "translateY(-5px)",
      transition: "0.4s ease-out",
      cursor: "pointer",
    },

    [theme.breakpoints.down("md")]: {
      width: "150px",
      height: "210px",
    },
  },
  cardContent: {
    display: "row",
    alignItems: "left",
    background: "red",
    float: "left",
  },
  box: {
    [theme.breakpoints.down("md")]: {
      width: "125px",
      height: "120px",
    },
  },
  media: {
    width: "150px",
    height: "155px",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      width: "120px",
      height: "125px",
    },
  },
  cardTitle: {
    fontSize: "1rem",
    margin: "10px auto 3px",
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  artistName: {
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  likeBtn: {
    position: "absolute",
    left: "0px",
    top: "0px",
    zIndex: "-1",
  },
}));

const MusicCard = ({ musicData, cardClickHandler, as }) => {
  const mouseEnterHandler = (songId) => {
    const target = document.getElementById(songId);
    target.src = require("./PlayBtnImg/playBtn.gif");
  };

  const mouseLeaveHandler = (songId) => {
    const target = document.getElementById(songId);
    target.src = musicData.cover;
  };

  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={2}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Card
        className={classes.card}
        onClick={() => cardClickHandler(musicData._id)}
        onMouseEnter={() => mouseEnterHandler(musicData._id)}
        onMouseLeave={() => mouseLeaveHandler(musicData._id)}
      >
        <Box className={classes.box}>
          <CardMedia
            component="img"
            className={classes.media}
            image={musicData.cover}
            title={musicData.name}
            id={musicData._id}
          />

          <div className={classes.cardTitle}>
            {musicData.name.length > 16
              ? musicData.name.slice(0, 15) + "..."
              : musicData.name.slice(0, 16)}
          </div>
          <div>
            <p className={classes.artistName}>
              {musicData.singer.length > 16
                ? musicData.singer.slice(0, 11) + "..."
                : musicData.singer.slice(0, 13)}
            </p>
          </div>
        </Box>
      </Card>

      {as !== "likeSongTabCard" && <LikeSong id={musicData._id} />}
    </Grid>
  );
};

export default MusicCard;
