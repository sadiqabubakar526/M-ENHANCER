import React, { useState } from "react";
import { makeStyles, Avatar, Typography, IconButton } from "@material-ui/core";
import { gql, useQuery, useMutation } from "@apollo/client";
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "190px",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  input: {
    display: "none",
  },
  large: {
    width: "125px",
    height: "125px",
  },
  name: {
    textAlign: "center",
    marginBottom: "1rem",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [profileImgFileState, setprofileImgFileState] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );

  const { data, loading, error } = useQuery(USER_PROFILE_QUERY, {
    onCompleted: (data) => {
      setprofileImgFileState(data.me.profileSrc);
    },
  });

  const [UploadProfileImg] = useMutation(UPLOAD_PROFILE_IMAGE_MUTATION, {
    onCompleted: (data) => {
      setprofileImgFileState(data.uploadProfile.url);
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    UploadProfileImg({ variables: { profileImgFile: file } });
  };

  return (
    <>
      {/* {error && <h1>{`Profile Picture Not Uploaded ! ${error.message}`}</h1>} */}
      {!data || loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <Avatar src={profileImgFileState} className={classes.large} />
              </IconButton>
            </label>
          </div>
          <div className={classes.name}>
            <Typography>{data.me.username}</Typography>
          </div>
        </>
      )}
    </>
  );
};

const USER_PROFILE_QUERY = gql`
  query {
    me {
      username
      profileSrc
      email
    }
  }
`;

const UPLOAD_PROFILE_IMAGE_MUTATION = gql`
  mutation uploadProfileImg($profileImgFile: Upload!) {
    uploadProfile(profileImgFile: $profileImgFile) {
      url
    }
  }
`;

export default Profile;
