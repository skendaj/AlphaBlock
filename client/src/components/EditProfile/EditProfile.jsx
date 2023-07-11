import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Link, Typography, Container, Box, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';



const EditProfile = () => {
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
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/user/` + userId,)
            .then((res) => {

                setPersonalID(res.data.personalID);
                setPhoto(res.data.photo);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                setPassword(res.data.password);
                console.log(res.data)
            })
            .catch((err) => console.log(err));
    }, []);
    const handleSave = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:8000/api/user/edit/` + userId, {
            personalID,
            photo,
            firstName,
            lastName,
            email
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className='edit'>
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
                            Edit Profile
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
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            style: { color: 'white' },
                                            sx: { '&::placeholder': { color: 'white' } }
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
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            style: { color: 'white' },
                                            sx: { '&::placeholder': { color: 'white' } }
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
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            style: { color: 'white' },
                                            sx: { '&::placeholder': { color: 'white' } }
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
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            style: { color: 'white' },
                                            sx: { '&::placeholder': { color: 'white' } }
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
                                        InputLabelProps={{ style: { color: 'white' } }}
                                        InputProps={{
                                            style: { color: 'white' },
                                            sx: { '&::placeholder': { color: 'white' } }
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
                                        // value={password}
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
                                        InputLabelProps={{ style: { color: 'white' } }}
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
                                        // value={confirmPassword}
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
                                onClick={handleSave}
                            >
                                Update Profile
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
export default EditProfile;
