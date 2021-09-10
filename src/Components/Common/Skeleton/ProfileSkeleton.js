import React from "react";
import { makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "190px",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: "125px",
    height: "125px",
  },
  name: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginBottom: "1rem",
  },
}));

const ProfileSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Skeleton variant="circle" className={classes.large} animation="wave" />
      </div>
      <div className={classes.name}>
        <Skeleton
          variant="text"
          width={130}
          className={classes.name}
          animation="wave"
        />
      </div>
    </>
  );
};

export default ProfileSkeleton;
