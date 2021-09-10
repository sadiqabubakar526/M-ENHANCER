import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";

import TabCard from "../../Common/Card/TabCard/TabCard";
import CardSkeleton from "../../Common/Skeleton/CardSkeleton";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    padding: "10px",
  },
  skeleton: {
    display: "flex",
  },
  paper: {
    width: "200px",
    height: "200px",
    margin: "20px",
  },
}));

const ArtistTab = ({ yourLibCardClickHandler }) => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(GET_ARTISTS_QUERY);
  //array for skeleton display
  const artistCardSkeleton = new Array(18).fill(0);
  return (
    <>
      {loading || !data ? (
        <div className={classes.skeleton}>
          <Grid container spacing={2}>
            {artistCardSkeleton.map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </Grid>
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            {data.getArtists.map(({ _id, name, singerProfileFile }) => {
              return (
                <TabCard
                  name={name}
                  picture={singerProfileFile}
                  id={_id}
                  key={_id}
                  yourLibCardClickHandler={yourLibCardClickHandler}
                />
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

const GET_ARTISTS_QUERY = gql`
  query {
    getArtists {
      _id
      name
      singerProfileFile
    }
  }
`;

export default ArtistTab;
