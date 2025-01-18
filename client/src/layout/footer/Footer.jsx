import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { Email } from "@mui/icons-material";

const mainColor = "#939185";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "2rem 0",
        borderTop: `2px solid ${mainColor}`,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: mainColor,
            fontWeight: 700,
            letterSpacing: "0.1rem",
          }}
        >
          GOOD FOOD
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: mainColor,
            fontSize: "1rem",
          }}
        >
          {`${new Date().getFullYear()} | @Ruchama Wilk`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            marginTop: "0.5rem",
          }}
        >
          <Email sx={{ color: mainColor, fontSize: "1.2rem" }} />
          <Link
            href="mailto:Ruchamawilk@gmail.com"
            sx={{
              color: mainColor,
              fontSize: "1rem",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
