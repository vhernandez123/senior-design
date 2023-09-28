import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import loginImage from "../images/dog.jpg";
function Login() {
  return (
    <Container maxWidth="md">
      <Grid className="dog-img" container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            src={loginImage}
            alt="Login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              Login
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
              <Button variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
