import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import "./index.css";
import { LoginProps } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { authLogin } from "../../../../redux/auth/thunk";
import { selectError } from "../../../../redux/auth/slice";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectError);
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginProps) => {
    const resultLogin = await dispatch(authLogin(values));
    if (authLogin.fulfilled.match(resultLogin)) {
      return navigate("/");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className="form-container"
            spacing={4}
          >
            <Grid>
              <h2>Super App</h2>
            </Grid>
            <Grid>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />
            </Grid>
            <Grid>
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
              />
            </Grid>
            {loginError && <Alert severity="error">{loginError}</Alert>}
            <Grid marginTop={6}>
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
