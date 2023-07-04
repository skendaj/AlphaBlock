import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Link, Typography, Container, Box, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckboxCrypto from './CheckboxCrypto';
import AlphaBlockLogo from '../../img/alphablocknamevertical.png';
import './InputWhiteText.css';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../Register/InputWhiteText.css';

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));

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

const Register = () => {
  const [personalID, setPersonalID] = useState('');
  const [photo, setPhoto] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation, setValidation] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        personalID,
        photo,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }, { withCredentials: true });

     
      if (response.status === 200) {
        console.log(response)
        localStorage.setItem('userId', JSON.stringify(response.data.user._id));
        navigate("/");
    }
}   catch (error) {
    console.log(error)
    setValidation(error)
}
};

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='register'>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mt: 6 }}>
              Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="personalID"
                    label="Personal ID (NID)"
                    name="personal-id"
                    autoComplete="personal-id"
                    onChange={(e) => setPersonalID(e.target.value)}
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                    }}
                  />
                  {validation.personalID ? validation.personalID.message : ''}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="photo"
                    label="Photo"
                    name="photo"
                    autoComplete="photo"
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                    }}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="first-name"
                    required
                    fullWidth
                    id="first-name"
                    label="First Name"
                    autoFocus
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {validation.firstName ? validation.firstName.message : ''}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last-name"
                    label="Last Name"
                    name="last-name"
                    autoComplete="family-name"
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {validation.lastName ? validation.lastName.message : ''}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validation.email ? validation.email.message : ''}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <WhiteIconButton
                            onClick={toggleShowPassword}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </WhiteIconButton>
                          
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validation.password ? validation.password.message : ''}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmpassword"
                    autoComplete="new-password"
                    InputProps={{
                      classes: {
                        input: 'white-text',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <WhiteIconButton
                            onClick={toggleShowConfirmPassword}
                            color= 'white'
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </WhiteIconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {validation.confirmPassword ? validation.confirmPassword.message : ''}
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
