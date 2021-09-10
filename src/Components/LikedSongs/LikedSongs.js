import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Loader from "../Common/Loader/Loader";
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
const LikedSongs = ({ getLikedSongs, cardClickHandler }) => {
  const classes = useStyles();

  return (
    <>
      <div>
        {getLikedSongs.error && (
          <h1>{`You Broken It ! ${getLikedSongs.error.message}`}</h1>
        )}
        {!getLikedSongs.data || getLikedSongs.loading ? (
          <Loader />
        ) : (
          <>
            <Typography variant="h5" className={classes.heading}>
              Your Favorites
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={2}>
                {getLikedSongs.data.getLikeSongs.map((song) => {
                  return (
                    <MusicCard
                      musicData={song}
                      key={song._id}
                      cardClickHandler={cardClickHandler}
                      as="likeSongTabCard"
                    />
                  );
                })}
              </Grid>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LikedSongs;
