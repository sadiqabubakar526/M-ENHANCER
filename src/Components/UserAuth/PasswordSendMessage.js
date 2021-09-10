import React from "react";
import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  passwordSendMessage: {
    margin: "20%",
  },
}));

const PasswordSendMessage = () => {
  const classes = useStyles();
  document.getElementsByTagName("body")[0].style.background = "black";

  return (
    <div>
      <div className={classes.passwordSendMessage}>
        <Alert severity="success">
          <AlertTitle>Password Reset Successfully</AlertTitle>
          New Password is send to your verified email address —
          <strong>check it out ! </strong>
        </Alert>
      </div>
    </div>
  );
};

export default PasswordSendMessage;
