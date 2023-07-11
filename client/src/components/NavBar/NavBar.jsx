import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Button, Menu, MenuItem, Avatar } from '@mui/material';
import LogoImage from '../../img/alphablockINVERTED.png';
import AvatarImage from '../../img/avatar.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransparentAppBar = styled(AppBar)({
  background: 'transparent',
  boxShadow: 'none',
  '& .MuiButton-label': {
    color: '#ffffff',
    textAlign: 'center',
    margin: '0 10px',
  },
  marginTop: '1%',
  height: '100px',
  alignItems: 'center',
});

const ProfileButton = styled(Button)({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  
});

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    console.log('logging out');
    axios
        .post('http://localhost:8000/api/logout', {}, { withCredentials: 'same-origin' })
        .then((e) => {
            localStorage.removeItem('userId');
            navigate('/login');
        });
};
const editProfile = () => {
  console.log('edit profile');
          navigate('/account/edit/');
};

  return (
    <>
      <ProfileButton color="inherit" onClick={handleClick}>
        <Avatar src={AvatarImage} alt="Avatar" sx={{ marginRight: '8px' }} />
      </ProfileButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={logOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

const NavigationBar = () => {
  return (
    <TransparentAppBar position="static">
      <div className="component-container">
      <Toolbar>
          <Button component={Link} to="/">
            <img src={LogoImage} alt="Logo" style={{ width: '50px', marginRight: '8px' }} />
          </Button>
          <Button color="inherit" component={Link} to="/" underline="none">
            Cryptocurrencies
          </Button>
          <Button color="inherit" component={Link} to="/exchanges" underline="none">
            Exchanges
          </Button>
          {/* <Button color="inherit" component={Link} to="/transfers" underline="none">
            Transfers
          </Button> */}
          <Button color="inherit" component={Link} to="/portfolio" underline="none">
            Portfolio
          </Button>
          {/* <Button color="inherit" component={Link} to="/favourites" underline="none">
            Favourites
          </Button> */}
          <ProfileMenu />
          </Toolbar>
      </div>
    </TransparentAppBar>
  );
};

export default NavigationBar;
