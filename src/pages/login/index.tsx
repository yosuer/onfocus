import Grid from "@mui/material/Unstable_Grid2";
import LoginForm from "./components/LoginForm";
import "./index.css";

const LoginPage = () => (
  <Grid
    container
    className="container"
    justifyContent="center"
    alignItems="center"
    spacing={2}
  >
    <Grid xs={10} sm={6} md={4} lg={3}>
      <LoginForm />
    </Grid>
  </Grid>
);

export default LoginPage;
