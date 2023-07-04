import React from 'react';
import { Grid, Typography } from '@mui/material';
import LogoImage from '../../img/alphablocknameINVERTED.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <Grid container sx={{ backgroundColor: '#1d1d20', color:'#ffffff', padding: '24px',  marginBottom: '1%' }}>
        <Grid item xs={12} md={6}>
          {/* Left column */}
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                <img src={LogoImage} alt="Logo" style={{ width: '200px', marginRight: '200px' }} />
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <div>AlphaBlock provides a fundamental analysis of the crypto market.</div>
                <div>In addition to tracking price, volume and market capitalisation,</div>
                <div>AlphaBlock tracks community growth, open-source code development,</div>
                <div>major events and on-chain metrics.</div>
                <br />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Right column */}
          <Grid container spacing={2} >
            <Grid item xs={6}>
              {/* First column */}
              <Typography variant="subtitle1" gutterBottom>
                About AlphaBlock
              </Typography>
              <Typography variant="body2" >
                About Us
              </Typography>
              <Typography variant="body2" >
              Terms of use 
              </Typography>
              <Typography variant="body2" >
              Privacy Policy 
              </Typography>
              <Typography variant="body2" >
              Cookie preferences 
              </Typography>
              <Typography variant="body2" >
              Community Rules
              </Typography>
              <Typography variant="body2" >
                Disclaimer
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {/* Second column */}
              <Typography variant="subtitle1" gutterBottom>
                Support
              </Typography>
              <Typography variant="body2" >
                Request Form
              </Typography>
              <Typography variant="body2" >
               FAQ
              </Typography>
              <Typography variant="body2" >
               Contact Support 
              </Typography>
              <Typography variant="body2" >
               Community Rules
              </Typography>
              <Typography variant="body2">
              Methodology
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/* Disclaimer */}
          <Typography variant="subtitle2" sx={{ color:'#ffffff'}}>
            IMPORTANT DISCLAIMER: All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose.
            Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. 
            No content on our Site is meant to be a solicitation or offer.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
