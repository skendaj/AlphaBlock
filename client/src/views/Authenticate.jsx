import React, { useState } from "react";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import TabList from '@mui/lab/TabList';
import { Tab, Typography, Box, Container, Button, Link } from "@mui/material";
import { TabPanel, TabPanels, Tabs, TabContext } from "@mui/lab";
import AlphaBlockLogo from '../img/alphablocknameINVERTED.png';

const Authenticate = ({ setRefresh }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      // maxW="l"
      // centerContent
      // sx={{
      //   background: "#1d1d20",
      // }}
    >
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="#1d1d20"
        w="100%"
      >
        <Button>
          <img src={AlphaBlockLogo} alt="Logo" style={{ width: '15%' }} />
        </Button>
      </Box>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange}>
            <Tab label="Log In" value="1" sx={{ color: "white" }} />
            <Tab label="Register" value="2" sx={{ color: "white" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Login {...{ setRefresh }} />
        </TabPanel>
        <TabPanel value="2">
          <Register />
        </TabPanel>
      </TabContext>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 2, color: "white" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="#" sx={{ color: "white" }}>
          AlphaBlock
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};

export default Authenticate;
