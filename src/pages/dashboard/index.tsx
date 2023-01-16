import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import TodosTable from "./components/TodosTable";
import { useAppDispatch } from "../../redux/hooks";
import { fetchAllTodos } from "../../redux/todos/thunk";
import { authLogout } from "../../redux/auth/thunk";
import "./index.css";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authLogout());
  };

  return (
    <Grid
      container
      className="container"
      justifyContent="center"
      alignContent="start"
      spacing={2}
    >
      <Grid xs={10} marginTop={1} textAlign="right">
        <Button color="warning" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      <Grid xs={12}>
        <h3 className="title">TODO's</h3>
      </Grid>
      <Grid xs={10}>
        <TodosTable />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
