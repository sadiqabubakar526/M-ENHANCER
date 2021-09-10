import React from "react";
import { makeStyles, Grid, Card, CardContent, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

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
    marginTop: "-7px",
    marginLeft: "-15px",
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

    "&:hover": {
      opacity: 0.6,
    },
  },
  cardTitle: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "150px",
    [theme.breakpoints.down("md")]: {
      width: "110px",
    },
  },
}));

const CardSkeleton = ({ as }) => {
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
      <Card className={classes.card}>
        <Box className={classes.box}>
          <Skeleton className={classes.media} />
          <CardContent className={classes.cardContent}>
            {as === "musicCard" ? (
              <>
                <Skeleton
                  variant="text"
                  className={classes.cardTitle}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  className={classes.cardTitle}
                  animation="wave"
                />
              </>
            ) : (
              <Skeleton
                variant="text"
                className={classes.cardTitle}
                animation="wave"
              />
            )}
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default CardSkeleton;
