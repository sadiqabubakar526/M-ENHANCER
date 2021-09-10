// import React, { useState } from "react";
// import { useQuery, gql } from "@apollo/client";
// import {
//   makeStyles,
//   InputBase,
//   fade,
//   IconButton,
//   Button,
// } from "@material-ui/core";
// import {
//   SearchOutlined as SearchIcon,
//   SendOutlined as SendIcon,
// } from "@material-ui/icons";
// import { useHistory } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "auto",
//       marginRight: 0,
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// const SearchBox = ({}) => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [search, setSearch] = useState("");
//   const [buttonVisibility, setButtonVisibility] = useState(0);
//   const [searchKey, setSearchKey] = useState("");

//   const { loading, data, error } = useQuery(SEARCH_QUERY, {
//     variables: {
//       songName: searchKey,
//       singerName: searchKey,
//     },
//   });

//   const handleSearch = (e) => {
//     e.target.value.length ? setButtonVisibility(1) : setButtonVisibility(0);
//     setSearch(e.target.value);
//   };

//   const sendQuery = () => {
//     setSearchKey(search);
//   };

//   return (
//     <div className={classes.search}>
//       <div className={classes.searchIcon}>
//         <SearchIcon />
//       </div>
//       <InputBase
//         placeholder="Search…"
//         classes={{
//           root: classes.inputRoot,
//           input: classes.inputInput,
//         }}
//         inputProps={{ "aria-label": "search" }}
//         onChange={handleSearch}
//       />
//       {buttonVisibility ? (
//         <Button variant="contained" onClick={sendQuery}>
//           Search
//         </Button>
//       ) : null}
//     </div>
//   );
// };

// const SEARCH_QUERY = gql`
//   #   query songById($songId: ID!) {
//   #     getSongById(songId: $songId) {
//   #       _id
//   #       name
//   #       description
//   #       singer
//   #       musicSrc
//   #       cover
//   #     }
//   #   }
//   query searchQuery($songName: String, $singerName: String) {
//     searchSong(songName: $songName, singerName: $singerName) {
//       name
//       singer
//     }
//   }
// `;

// export default SearchBox;
