import React, { useMemo, useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import Loader from '../Loader/Loader';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#000000',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#000000',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};
const img = {
  display: 'block',
  width: '100%',
  height: '100%',
};

const DragAndDrop = (props) => {
  const [files, setFiles] = useState([]);

  const [UploadUserMoodImg, { loading, data }] = useMutation(
    UPLOAD_USER_MOOD_IMAGE_MUTATION,
    {
      onCompleted: (data) => {
        props.handleClose();
      },
      onError(err) {
        // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      refetchQueries: [
        {
          query: gql`
            query {
              getPlayList {
                _id
                name
                singer
                musicSrc
                cover
                playCount
                moodType
              }
            }
          `,
        },
      ],
    }
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <p> Preview Image</p>
      <div>
        <img src={file.preview} style={img} alt='Upload Pic' />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const uploadImageHandler = () => {
    UploadUserMoodImg({
      variables: {
        userMoodImgFile: files[0],
      },
    });
  };

  return (
    <>
      {!data && (
        <>
          <div className='container'>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here or</p>
              <button type='button' onClick={open}>
                Choose File
              </button>
            </div>
            <aside>
              {thumbs}
              <p>{filepath}</p>
            </aside>
          </div>
          <div>
            <center>
              <Button
                variant='outlined'
                color='secondary'
                size='small'
                id='uploadBtn'
                onClick={uploadImageHandler}
                style={{ margin: '10px', marginBottom: '0px' }}
              >
                Upload
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                size='small'
                id='closeBtn'
                onClick={props.handleClose}
                style={{ margin: '10px', marginBottom: '0px' }}
              >
                Close
              </Button>
            </center>
          </div>
        </>
      )}
      {loading ? (
        <>
          <h4>PlayList Generation is Under Process,Please wait</h4>
          <Loader />
        </>
      ) : (
        <>{data && <h1>Song</h1>}</>
      )}
    </>
  );
};

const UPLOAD_USER_MOOD_IMAGE_MUTATION = gql`
  mutation uploadUserMoodImg($userMoodImgFile: Upload!) {
    uploadUserMoodImg(userMoodImgFile: $userMoodImgFile) {
      url
    }
  }
`;

export default DragAndDrop;
