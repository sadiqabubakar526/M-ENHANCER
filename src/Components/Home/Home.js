import React, { useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import MusicCard from "../Common/Card/MusicCard/MusicCard";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  heading: {
    marginBottom: "10px",
    align: "left",
    fontStyle: "bold",
  },
  card: {
    width: "150px",
    height: "190px",
  },
  media: {
    width: "120px",
    height: "120px",
  },
});

const Home = ({ cardClickHandler, musicInfo }) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <Typography variant="h5" className={classes.heading}>
          Top Trends
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={2}>
            {musicInfo.data.getAllSongs.map((musicData) => {
              return (
                <MusicCard
                  musicData={musicData}
                  key={musicData._id}
                  cardClickHandler={cardClickHandler}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;
