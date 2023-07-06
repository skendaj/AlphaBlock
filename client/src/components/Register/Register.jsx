import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TextField, Button, Grid, Link, Typography, Container, Box, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckboxCrypto from './CheckboxCrypto';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../Register/InputWhiteText.css';
import './InputWhiteText.css';
import AlphaBlockLogo from '../../img/alphablocknameINVERTED.png';

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
    text: {
      primary: '#ffffff',
    },
  },
});


const Register = () => {
  const { id } = useParams();
  const [personalID, setPersonalID] = useState('');
  const [photo, setPhoto] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId')
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/` + userId)
      .then((res) => {
        setPersonalID(res.data.personalID);
        setPhoto(res.data.photo);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setPassword(res.data.password);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/register',
        {
          personalID,
          photo,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('userId', JSON.stringify(response.data.user._id));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setValidationErrors(error.response.data.errors);
      } else {
        setValidationErrors({});
      }
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
            <img src={AlphaBlockLogo} alt="Logo" style={{ width: '50%', marginTop: '15%' }} />

            <Typography component="h1" variant="h5" sx={{ mt: 6 }}>
              Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={personalID}
                    id="personalID"
                    label="Personal ID (NID)"
                    name="personal-id"
                    autoComplete="personal-id"
                    onChange={(e) => setPersonalID(e.target.value)}
                    className="input-white-text"
                    InputProps={{
                      classes: {
                        input: 'white-input',
                      },
                    }}
                  />
                  {validationErrors.personalID && (
                    <p className="text-danger">{validationErrors.personalID.message}</p>
                  )}                
                  </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={photo}
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
                  {validationErrors.photo && (
                    <p className="text-danger">{validationErrors.photo.message}</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="first-name"
                    required
                    value={firstName}
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
                  {validationErrors.firstName && (
                    <p className="text-danger">{validationErrors.firstName.message}</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={lastName}
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
                  {validationErrors.lastName && (
                    <p className="text-danger">{validationErrors.lastName.message}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={email}
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
                  {validationErrors.email && (
                    <p className="text-danger">{validationErrors.email.message}</p>
                  )}                
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={password}
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
                  {validationErrors.password && (
                    <p className="text-danger">{validationErrors.password.message}</p>
                  )}                            
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={confirmPassword}
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
                            color='white'
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
                  {validationErrors.confirmPassword && (
                    <p className="text-danger">{validationErrors.confirmPassword.message}</p>
                  )}                  
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
