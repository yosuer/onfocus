import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch } from "../../redux/hooks";
import { fetchAllTodos } from "../../redux/todos/thunk";
import "./index.css";
import TodosTable from "./components/TodosTable";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  return (
    <Grid
      container
      className="container"
      justifyContent="center"
      alignContent="start"
      spacing={2}
    >
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
