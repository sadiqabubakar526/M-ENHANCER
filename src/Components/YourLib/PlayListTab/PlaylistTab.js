import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import TabCard from "../../Common/Card/TabCard/TabCard";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    display: "flex",
    padding: "10px",
  },
  paper: {
    width: "200px",
    height: "200px",
    margin: "20px",
  },
}));

const PlaylistTab = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {data.map((text) => {
          return <TabCard musicData={text} key={text.id} />;
        })}
      </Grid>
    </div>
  );
};

export default PlaylistTab;
