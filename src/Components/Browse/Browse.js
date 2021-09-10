import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import MusicCard from "../Common/Card/MusicCard/MusicCard";
import Loader from "../Common/Loader/Loader";
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

const Browse = ({ search, cardClickHandler, musicInfo }) => {
  const classes = useStyles();
  let musicData = [];
  let capitalizeSearch = search.trim().replace(/\b\w/g, (c) => c.toUpperCase());
  const searchResult = () => {
    if (musicInfo.data) {
      musicInfo.data.getAllSongs.map((songData) => {
        if (
          songData.name.includes(capitalizeSearch) ||
          songData.singer.includes(capitalizeSearch)
        ) {
          musicData.push(songData);
        }
      });
    }
  };

  searchResult();

  return (
    <>
      <div>
        {musicInfo.error && (
          <h1>{`You Broken It ! ${musicInfo.error.message}`}</h1>
        )}
        {!musicInfo.data || musicInfo.loading ? (
          <Loader />
        ) : (
          <>
            <Typography variant="h5" className={classes.heading}>
              Top Trends
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={2}>
                {musicData.map((song) => {
                  return (
                    <MusicCard
                      musicData={song}
                      key={song._id}
                      cardClickHandler={cardClickHandler}
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

export default Browse;
