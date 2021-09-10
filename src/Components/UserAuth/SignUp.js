import React, { useState, useContext } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

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
    margin: '20px',
    fontFamily: 'fangsong',
  },
  textField: {
    margin: '10px',
    width: '500px',
  },
  loginLink: {
    color: 'lightblue',
    width: '500px',
    margin: '10px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
}));

const SignUp = () => {
  document.getElementsByTagName('html')[0].style.background = 'black';
  const context = useContext(AuthContext);

  const classes = useStyles();
  const [error, setError] = useState(false);
  const [userHelperText, setUserHelperText] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState(
    ''
  );
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // onInput change all the erro messages are remove.
    setError(false);
    setUserHelperText('');
    setEmailHelperText('');
    setPasswordHelperText('');
    setConfirmPasswordHelperText('');
    setErrors('');
  };

  const history = useHistory();
  const [signUpUser] = useMutation(REGISTER_MUTATION, {
    update(_, result) {
      if (result) {
        context.login(result.data.register);
        history.push('/');
      }
    },
    onError(err) {
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const formValidation = () => {
    // Username validation
    if (values.username === '' || values.username === null) {
      setError(true);
      setUserHelperText('Username must not be empty');
    } else {
      setError(false);
    }
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

    // Password validation

    if (values.password === '' || values.password === null) {
      setError(true);
      setPasswordHelperText('Password must not be empty');
    } else if (values.password.toString().length < 8) {
      setError(true);
      setPasswordHelperText('Password Length atleast 8 characters');
    } else {
      setError(false);
    }

    // ConfirmPassword validation
    if (values.confirmPassword === '' || values.password === null) {
      setError(true);
      setConfirmPasswordHelperText('Confirm Password must not be empty');
    } else if (values.password !== values.confirmPassword) {
      setError(true);
      setConfirmPasswordHelperText(
        'Password and confirm password are not matched'
      );
    } else {
      setError(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    formValidation();
    signUpUser();
  };
  return (
    <div>
      <h1 className={classes.title}>SIGN UP</h1>

      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={onFormSubmit}
      >
        {errors.email ? (
          <div>
            <Alert
              variant='outlined'
              severity='error'
              className={classes.textField}
            >
              {errors.email}
            </Alert>
          </div>
        ) : null}
        <div>
          <TextField
            id='outlined-flexible'
            label='Username'
            variant='outlined'
            color='secondary'
            type='text'
            name='username'
            onChange={onChange}
            error={userHelperText ? 1 : 0}
            helperText={userHelperText}
            size='small'
            className={classes.textField}
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
          />
        </div>
        <div>
          <TextField
            id='outlined-flexible'
            label='Password'
            variant='outlined'
            color='secondary'
            type='password'
            name='password'
            onChange={onChange}
            error={passwordHelperText ? 1 : 0}
            helperText={passwordHelperText}
            size='small'
            className={classes.textField}
          />
        </div>
        <div>
          <TextField
            id='outlined-flexible'
            label='Confirm Password'
            variant='outlined'
            color='secondary'
            type='password'
            name='confirmPassword'
            onChange={onChange}
            error={confirmPasswordHelperText ? 1 : 0}
            helperText={confirmPasswordHelperText}
            size='small'
            className={classes.textField}
          />
        </div>
        <div>
          <p
            className={classes.loginLink}
            onClick={() => history.push('/login')}
          >
            Already have an account ? <u>Login</u>
          </p>
        </div>
        <div>
          <Button
            variant='outlined'
            color='secondary'
            type='submit'
            className={classes.textField}
          >
            SIGN UP
          </Button>
        </div>
      </form>
    </div>
  );
};

const REGISTER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
      username
    }
  }
`;

export default SignUp;
