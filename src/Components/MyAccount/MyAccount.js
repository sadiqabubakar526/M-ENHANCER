import React, { useState, useContext } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Profile from '../Common/Profile/Profile';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    background: 'black',
    padding: '20px',
    width: '600px',
    margin: 'auto',
  },
  title: {
    color: '#f0db72',
    textAlign: 'center',
    marginTop: '90px',
    fontFamily: 'fangsong',
  },
  textField: {
    margin: '10px',
    width: '500px',
  },
  profileImg: {
    width: '500px',
  },
  signUpLink: {
    color: 'lightblue',
    width: '500px',
    margin: '10px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
}));

const MyAccount = () => {
  document.getElementsByTagName('html')[0].style.background = 'black';

  const classes = useStyles();
  const [error, setError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [usernameHelperText, setUserNameHelperText] = useState('');
  const [disabledToggler, setDisabledToggler] = useState(true);
  const [values, setValues] = useState({
    username: '',
    email: '',
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // onInput change all the erro messages are remove.
    setError(false);
    setEmailHelperText('');
    setUserNameHelperText('');
  };

  const { data, loading, error: queryError } = useQuery(USER_PROFILE_QUERY, {
    onCompleted: (data) => {
      setValues({ ...values });
    },
  });

  const history = useHistory();
  // Update user profile after mutation
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO, {
    update(proxy) {
      const myCache = proxy.readQuery({ query: USER_PROFILE_QUERY });
      if (myCache) {
        proxy.writeQuery({
          query: USER_PROFILE_QUERY,
          data: {
            me: myCache.me,
          },
        });
      }
    },
  });

  const formValidation = () => {
    // Email validation
    let reg = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;

    if (values.email === '' || values.email === null) {
      setError(true);
      setEmailHelperText('Email must not be empty');
    } else if (reg.test(values.email) === false) {
      setError(true);
      setEmailHelperText('Please enter valid email  address');
    } else {
      setError(false);
    }

    // Username validation

    if (values.username === '' || values.username === null) {
      setError(true);
      setUserNameHelperText('Username must not be empty');
    } else if (values.username.toString().length < 5) {
      setError(true);
      setUserNameHelperText('Username Length atleast 5 characters');
    } else {
      setError(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    formValidation();
    updateUserInfo({ variables: values });
  };

  const editBtnHandler = (e) => {
    setDisabledToggler(false);
    if (data) {
      setValues({ username: data.me.username, email: data.me.email });
    }
  };

  return (
    <div>
      <h1 className={classes.title}>MY ACCOUNT</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        // onSubmit={onFormSubmit}
      >
        <div className={classes.profileImg}>
          <Profile />
        </div>

        {queryError && (
          <h1>{`Account Information not open ! ${queryError.message}`}</h1>
        )}
        {!data || loading ? (
          <CircularProgress />
        ) : (
          <>
            <div>
              <TextField
                id='outlined-flexible'
                label='Username'
                variant='outlined'
                color='secondary'
                type='text'
                name='username'
                onChange={onChange}
                error={usernameHelperText ? 1 : 0}
                helperText={usernameHelperText}
                size='small'
                className={classes.textField}
                defaultValue={data.me.username}
                disabled={disabledToggler}
              />
            </div>
            <div>
              <TextField
                id='outlined-flexible'
                label='Email'
                variant='outlined'
                color='secondary'
                type='email'
                name='email'
                onChange={onChange}
                error={emailHelperText ? 1 : 0}
                helperText={emailHelperText}
                size='small'
                className={classes.textField}
                defaultValue={data.me.email}
                disabled={disabledToggler}
              />
            </div>
            {disabledToggler ? (
              <div>
                <Button
                  variant='outlined'
                  color='secondary'
                  // type="button"
                  className={classes.textField}
                  onClick={editBtnHandler}
                >
                  Edit Username or Email
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant='outlined'
                  color='secondary'
                  className={classes.textField}
                  onClick={onFormSubmit}
                >
                  Update Profile
                </Button>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

const USER_PROFILE_QUERY = gql`
  query {
    me {
      username
      email
    }
  }
`;

const UPDATE_USER_INFO = gql`
  mutation updateProfile($username: String!, $email: String!) {
    updateUserInfo(updateUserInput: { username: $username, email: $email })
  }
`;

export default MyAccount;
