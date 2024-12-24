
import React from "react";
import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{width: "100%",height: "auto",backgroundColor: "#E6B9A6",paddingTop: "1rem",paddingBottom: "1rem",textAlign: "center"}}>
        <Container  sx={{display: 'flex',flexDirection: 'column'}}>
            <Typography color="#2F3645" variant="h5">
              Recipe For You
            </Typography>
            <Typography color="#2F3645" variant="subtitle1">
              {`${new Date().getFullYear()} | @Rucahma Wilk |  ` }
              <a href="mailto:Ruchamawilk@gmail.com" style={{color:"#2F3645"}}>Contact Us!</a>
            </Typography>
      </Container>
    </Box>
  );
};
export default Footer;








