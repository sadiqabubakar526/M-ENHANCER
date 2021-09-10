import React from "react";
import { makeStyles, TableRow, TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  loader: {
    backgroundColor: "white",
    marginTop: "250px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  table: {
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  container: {
    maxHeight: 800,
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  textAlign: {
    textAlign: "center",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  columTitleRow: {
    background: "black",
  },
  editBtn: {
    backgroundColor: "green",
    marginLeft: "15px",
  },
  deleteBtn: {
    backgroundColor: "red",
    marginLeft: "15px",
  },
  coverImg: {
    width: "50px",
    height: "50px",
  },
}));

const ArtistWithSongListTableRow = ({
  name,
  playCount,
  cover,
  index,
  songId,
  playButtonHandler,
  album,
}) => {
  const classes = useStyles();

  const iconHandlerOnHover = (songId) => {
    const indexCell = document.getElementById(index);
    indexCell.textContent = "|>";
    indexCell.style.fontSize = "20px";
  };
  const iconHandlerOnLeave = (songId) => {
    const indexCell = document.getElementById(index);
    indexCell.textContent = index + 1;
    indexCell.style.fontSize = "14px";
  };

  return (
    <>
      <TableRow
        hover
        onMouseOver={() => iconHandlerOnHover(songId)}
        onMouseLeave={() => iconHandlerOnLeave(songId)}
        onClick={() => playButtonHandler(songId)}
      >
        <TableCell className={classes.textAlign} id={index}>
          {index + 1}
        </TableCell>
        <TableCell className={classes.textAlign}>
          <img src={cover} alt="img" className={classes.coverImg} />
        </TableCell>
        <TableCell className={classes.textAlign}>{name}</TableCell>
        <TableCell className={classes.textAlign}>{playCount}</TableCell>
        <TableCell className={classes.textAlign}>{album}</TableCell>
      </TableRow>
    </>
  );
};

export default ArtistWithSongListTableRow;
