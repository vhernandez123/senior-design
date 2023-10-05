import React from "react";
import { Typography, TextField, Button, Paper, Grid } from "@mui/material";
import loginImage from "../images/dog.jpg";
import "../Css/Site.css";
import GoogleButton from "react-google-button";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginButton from "../project_components/googleButton";
import LogoutButton from "../project_components/logout";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENTID;
function Login() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={window.location.origin}
    >
      <Grid className="dog-img">
        <Grid className="dog-login-signup">
          <img src={loginImage} alt="Login" />
        </Grid>
        <Grid>
          <Paper elevation={5} className="paper-container">
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography variant="h5" gutterBottom>
              Please Fill Out The Information Below
            </Typography>
            <form>
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
              <div className="button-container">
                <Button
                  href="/home"
                  style={{ backgroundColor: "#3BD16F" }}
                  className="login-button"
                  variant="contained"
                >
                  Login
                </Button>
                <LoginButton />
                <LogoutButton />
              </div>
              <p>Don't have an account?</p>
              <a href="/signUp">Sign Up</a>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Auth0Provider>
  );
}

export default Login;
