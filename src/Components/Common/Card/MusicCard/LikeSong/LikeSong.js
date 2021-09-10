import React, { useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
} from '@material-ui/icons';
import { gql, useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  likeBtn: {
    zIndex: '98',
    position: 'absolute',
    marginLeft: '115px', // 106
    marginTop: '210px', // 175
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginTop: '175px',
      marginRight: '10px',
    },
  },
  likeBtnSize: {
    width: '26px',
    height: '26px',
  },
}));

const LikeSong = ({ id }) => {
  const classes = useStyles();
  const [like, setLike] = useState(false);

  const [addToLikeSong] = useMutation(ADD_TO_LIKE_SONGS_MUTATION, {
    refetchQueries: [
      {
        query: gql`
          query {
            getLikeSongs {
              _id
              name
              musicSrc
              singer
            }
          }
        `,
      },
    ],
  });

  const likeSong = (songId) => {
    setLike(!like);
    addToLikeSong({
      variables: { songId },
    });
  };
  return (
    <div className={classes.likeBtn} onClick={() => likeSong(id)}>
      {like ? (
        <IconButton>
          <FavoriteOutlinedIcon color='error' className={classes.likeBtnSize} />
        </IconButton>
      ) : (
        <IconButton>
          <FavoriteBorderOutlinedIcon
            color='secondary'
            className={classes.likeBtnSize}
          />
        </IconButton>
      )}
    </div>
  );
};

const ADD_TO_LIKE_SONGS_MUTATION = gql`
  mutation addToLikeSongs($songId: ID!) {
    addToLikeSongs(songId: $songId)
  }
`;

// const GET_LIKE_SONGS_QUERY = gql`
//   query {
//     getLikeSongs {
//       _id
//       name
//       musicSrc
//     }
//   }
// `;

export default LikeSong;
