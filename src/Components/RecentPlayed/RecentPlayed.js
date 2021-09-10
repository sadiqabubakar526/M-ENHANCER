import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import MusicCard from "../Common/Card/MusicCard/MusicCard";
import CardSkeleton from "../Common/Skeleton/CardSkeleton";
import { Alert } from "@material-ui/lab";
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

const RecentPlayed = ({ cardClickHandler, getRecentPlay }) => {
  const classes = useStyles();
  //array for skeleton display
  const RecentPlayedCardSkeleton = new Array(18).fill(0);

  return (
    <>
      <div>
        {getRecentPlay.error && (
          // <h1>{`You Broken It ! ${getRecentPlay.error.message}`}</h1>
          <Alert severity="error">{getRecentPlay.error.message} </Alert>
        )}
        {!getRecentPlay.data || getRecentPlay.loading ? (
          <>
            <Typography variant="h5" className={classes.heading}>
              Recent Played
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={2}>
                {RecentPlayedCardSkeleton.map((_, index) => (
                  <CardSkeleton as="musicCard" key={index} />
                ))}
              </Grid>
            </div>
          </>
        ) : (
          <>
            <div className={classes.root}>
              <Grid container spacing={2}>
                {getRecentPlay.data.getRecentPlay.map((song) => {
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

export default RecentPlayed;
