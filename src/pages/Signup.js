import React from "react";
import { Typography, TextField, Button, Paper, Grid } from "@mui/material";
import loginImage from "../images/dog.jpg";
import "../Css/Site.css";

function Signup() {
  return (
    <Grid className="dog-img">
      <Grid className="dog-login-signup">
        <img src={loginImage} alt="Login" />
      </Grid>
      <Grid>
        <Paper elevation={5} className="signup-paper-container">
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
          <Typography variant="h5" gutterBottom>
            Please Fill Out The Information Below
          </Typography>
          <form>
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
            />
            <TextField
              label="Confirm Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
            />
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
            />
            <div className="button-container">
              <Button
                style={{ backgroundColor: "#3BD16F" }}
                className="next-button"
                variant="contained"
              >
                Next
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
