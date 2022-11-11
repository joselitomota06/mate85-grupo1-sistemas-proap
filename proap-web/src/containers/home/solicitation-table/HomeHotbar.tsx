import React from "react";

import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";

import { HomeHotbarLink } from "./HomeHotbar.style";

export default function HomeHotbar() {
  return (
    <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={3} paddingTop={2} paddingBottom={3}>
          <HomeHotbarLink to="solicitation/create">
            <Button
              variant="outlined"
              size="large"
              startIcon={<AddIcon />}
              fullWidth
              style={{ padding: "1rem 1rem", border: "3px solid" }}
            >
              Criar nova solicitação
            </Button>
          </HomeHotbarLink>
        </Grid>
      </Grid>
    </Box>
  );
}
