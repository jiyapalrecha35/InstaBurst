import React from 'react';
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Check if the background color is dark
  const isDarkBackground = theme.palette.mode === 'dark';

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="2rem"
        textAlign="center"
      >
        <Typography
          fontFamily="Satisfy" 
          fontWeight="bold" 
          fontSize="45px" 
          color={isDarkBackground ? 'white' : 'primary'}
          textAlign="center"
        >
          InstaBurst
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "47%" : "95%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="bold"
          fontSize={isNonMobileScreens ? "1.8rem" : "2rem"}
          mb={isNonMobileScreens ? "2rem" : "1.5rem"}
          textAlign="center"
          color={isDarkBackground ? 'white' : 'text.primary'}
        >
          Spark Connections, Capture Moments, Share Life's Story! 📸✨
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default LoginPage;
