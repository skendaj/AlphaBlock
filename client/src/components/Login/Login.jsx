import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './InputWhiteText.css';
import { styled } from '@mui/system';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#1d1d20',
    },
  },
  typography: {
    body1: {
      color: 'white',
    },
    body2: {
      color: 'white',
    },
  },
});

const Login = ({ setRefresh }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState({});
  const [show, setShow] = useState(false);

  const showPass = (e) => {
    setShow(!show);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('userId', response.data.user._id);
        setRefresh(Math.random());
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setValidation(error.response.data.errors);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: '#1d1d20',
            height: "70%",
            backgroundImage:
              'url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: "auto",
              maxWidth: "100%",
              height: "100%",
              backgroundColor: '#1d1d20',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" sx={{ mt: 1, width: "80%", }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  classes: {
                    input: 'white-text',
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validation.email ? validation.email.message : ""}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={show ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  classes: {
                    input: 'white-text',
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validation.password ? validation.password.message : ""}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;