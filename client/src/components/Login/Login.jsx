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
import { styled } from '@mui/system';
import './InputWhiteText.css';
import AlphaBlockLogo from '../../img/alphablocknameverticalINVERTED.png';


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
    text: {
      primary: '#ffffff',
    },
  },
});

const Login = ({ setRefresh }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState({});
  const [show, setShow] = useState(false);
  const [autoplay, setAutoplay] = useState(true);


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
        console.log(response.data);
        const id= await response
        localStorage.setItem('userId',response.data._id );
        // setRefresh(Math.random());
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
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <img
    src="https://i.giphy.com/media/W5UoBN0YMdT1QP8Yfr/giphy.webp"
    alt="GIF"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
</Grid>
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
                <img src={AlphaBlockLogo} alt="Logo" style={{ width: '18%', marginTop: '15%' }} />

            <Typography component="h1" variant="h5" sx={{
              marginTop: '15%'}}>
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button type="submit" fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 3, mb: 2 }}>
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