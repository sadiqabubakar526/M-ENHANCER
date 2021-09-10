import React from 'react';
import { makeStyles, Grid, Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import CameraIcon from '@material-ui/icons/Camera';
const fs = require('fs');

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
    fontSize: '20px',
    margin: '10px',
  },
  divider: {
    margin: '10px',
  },
});

const FaceCaptureModal = ({ handleClose }) => {
  const classes = useStyles();
  // const [base64Img, setBase64Img] = React.useState("");
  const [proccessImage, { loading }] = useMutation(PROCESS_IMAGE_MUTATION);

  const tackPhotoHandler = (e) => {
    let canvas = document.querySelector('#photoCanvas');
    let context = canvas.getContext('2d');
    let video = document.querySelector('#captureVideo');
    // let img = document.getElementById("myPhoto");
    // Async task(captureImage)
    const captureImage = async () => {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      video.srcObject = videoStream;
      video.play();
      const img64 = canvas.toDataURL('image/png');

      // const link = img64.replace(
      //   /^data:image\/[^;]/,
      //   "data:application/octet-stream"
      // );
      // console.log("link", link);
      // let url = img64.replace(
      //   /^data:image\/png/,
      //   "data:application/octet-stream"
      // );
      // fs.writeFile("pic1", img64, { encoding: "base64" }, (err) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("file created");
      //   }
      // });
      // console.log(url);
      // setBase64Img(img64);
      uploadImageHandler(img64);

      // img.src = canvas.toDataURL("image/png");
      // const pic = document.getElementById("myPhoto");
      // pic.src = img64;

      document.getElementById('uploadBtn').addEventListener('click', () => {
        videoStream.getTracks().forEach(function (track) {
          track.stop();
        });
        handleClose();
      });
      document.getElementById('closeBtn').addEventListener('click', () => {
        videoStream.getTracks().forEach(function (track) {
          track.stop();
        });
        handleClose();
      });
    };
    captureImage();
    context.drawImage(video, 0, 0, 270, 200);
  };

  const uploadImageHandler = (base64) => {
    // console.log("state", base64Img);
    proccessImage({
      variables: {
        base64Image: base64,
      },
    });
  };

  return (
    <div>
      <Grid container direction='row' justify='center' alignItems='center'>
        <div>
          <p className={classes.title}>Take Image</p>
          <video
            id='captureVideo'
            width='270'
            height='200'
            autoPlay
            style={{
              borderRadius: '7px',
              backgroundImage: 'linear-gradient(to right,#f5f7fa, #c3cfe2)',
            }}
          ></video>
          <div>
            {/* <button id="snap" onClick={tackPhotoHandler}>
              Take Photo
            </button> */}
            <center>
              {/* <Button
                variant="outlined"
                color="secondary"
                id="snap"
                onClick={tackPhotoHandler}
              >
                Take Photo
              </Button> */}
              {/* <IconButton onClick={tackPhotoHandler} color="secondary">
                <CameraIcon />
              </IconButton> */}
              <Button
                variant='outlined'
                color='secondary'
                startIcon={<CameraIcon />}
                size='small'
                onClick={tackPhotoHandler}
              >
                Take Photo
              </Button>
            </center>
          </div>
        </div>

        {/* <div>
          <img src="" id="myPhoto" />
        </div> */}
        <div>
          <p className={classes.title}>Preview Image</p>

          <canvas
            id='photoCanvas'
            width='270'
            height='200'
            style={{ borderRadius: '7px', background: '#0E1111' }}
          ></canvas>
          <center>
            <Button
              variant='outlined'
              color='secondary'
              size='small'
              id='uploadBtn'
              // onClick={uploadImageHandler}
              style={{ marginRight: '10px' }}
            >
              Upload
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              size='small'
              id='closeBtn'
              onClick={handleClose}
            >
              Close
            </Button>
          </center>
        </div>
      </Grid>
    </div>
  );
};

const PROCESS_IMAGE_MUTATION = gql`
  mutation uploadModelInput($base64Image: Upload!) {
    processImage(base64Image: $base64Image) {
      url
    }
  }
`;

export default FaceCaptureModal;
