import React, { useState } from "react";
import {
  makeStyles,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CardMedia,
} from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";
import Loader from "../../Common/Loader/Loader";
import ArtistWithSongListTableRow from "./ArtistWithSongListTableRow";
import MusicPlayer from "../../Common/MusicPlayer/MusicPlayer";

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
  paper: {
    width: "auto",
    height: "400px",
    margin: "10px",
    background: "green",
  },
  bottomLeft: {
    position: "absolute",
    bottom: "8px",
    left: "16px",
  },
  // container: {
  //   position: "relative",
  //   textAlign: "center",
  //   color: "white",
  // },
  artistImg: {
    width: "100%",
    height: "auto",
    opacity: "0.7",
  },
  textPos: {
    position: "absolute",
    top: 360,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "16px",
    textAlign: "left",
    fontFamily: "Montserrat",
    fontSize: "45px",
    fontWeight: "600px",
  },
}));

const ArtistWithSongList = ({ artistId }) => {
  const classes = useStyles();
  const columTitleRow = ["Index", "Cover", "Title", "Hits", "Album"];

  const { data, loading, error } = useQuery(GET_ARTIST_BY_ID_QUERY, {
    variables: {
      artistId,
    },
  });
  const getSongsByArtist = useQuery(GET_SONGS_BY_ARTIST, {
    variables: {
      artistId,
    },
  });
  const [songIdForArtist, setSongIdForArtist] = useState("");
  const playButtonHandler = (songId) => {
    setSongIdForArtist(songId);
  };

  return (
    <div>
      {error && <h1>{`Something wents wrong ! ${error.message}`}</h1>}
      {!data || loading ? (
        <Loader />
      ) : (
        <>
          <TableContainer className={classes.container}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="400px"
              width="auto"
              image={data.getArtistById.singerProfileFile}
              title="Contemplative Reptile"
              className={classes.card}
            />
            <h1>{data.getArtistById.name}</h1>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {columTitleRow.map((title) => (
                    <TableCell
                      key={title}
                      className={`${classes.textAlign} ${classes.columTitleRow}`}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {getSongsByArtist.error && (
                  <h1>{`Songs Not Found ! ${getSongsByArtist.error.message}`}</h1>
                )}

                {!getSongsByArtist.data || getSongsByArtist.loading ? (
                  <Loader />
                ) : (
                  getSongsByArtist.data.getSongsByArtist.map((song, index) => {
                    return (
                      <ArtistWithSongListTableRow
                        name={song.name}
                        playCount={song.playCount}
                        cover={song.cover}
                        index={index}
                        key={song._id}
                        songId={song._id}
                        album={song.album}
                        playButtonHandler={playButtonHandler}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {getSongsByArtist.data && (
            <MusicPlayer
              songIdForYourLibArtistTab={songIdForArtist}
              songInfoForYourLibArtist={getSongsByArtist.data}
              as="YourLibArtist"
            />
          )}
        </>
      )}
    </div>
  );
};

const GET_ARTIST_BY_ID_QUERY = gql`
  query artistById($artistId: ID!) {
    getArtistById(artistId: $artistId) {
      _id
      name
      singerProfileFile
    }
  }
`;

const GET_SONGS_BY_ARTIST = gql`
  query getSongByArtist($artistId: ID!) {
    getSongsByArtist(artistId: $artistId) {
      _id
      name
      description
      singer
      album
      musicSrc
      playCount
      cover
    }
  }
`;

export default ArtistWithSongList;
