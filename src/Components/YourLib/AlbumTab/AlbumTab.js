import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TabCard from "../../Common/Card/TabCard/TabCard";
import { useQuery, gql } from "@apollo/client";
import CardSkeleton from "../../Common/Skeleton/CardSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    padding: "10px",
  },
  paper: {
    width: "200px",
    height: "200px",
    margin: "20px",
  },
}));

const AlbumTab = () => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(GET_ALBUM_QUERY);
  //array for skeleton display
  const albumCardSkeleton = new Array(18).fill(0);

  return (
    <>
      {loading || !data ? (
        <div className={classes.skeleton}>
          <Grid container spacing={2}>
            {albumCardSkeleton.map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </Grid>
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            {data.getAlbums.map(({ _id, album, cover }) => {
              return (
                <TabCard name={album} picture={cover} id={_id} key={_id} />
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

const GET_ALBUM_QUERY = gql`
  query {
    getAlbums {
      _id
      album
      cover
    }
  }
`;

export default AlbumTab;
