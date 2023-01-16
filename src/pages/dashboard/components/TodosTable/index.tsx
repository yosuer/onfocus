import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  changePage,
  changeRowsPerPage,
  deleteTodo,
  selectItemsPage,
  selectPagination,
  toggleCompleted,
} from "../../../../redux/todos/slice";

const TodosTable = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(selectItemsPage);
  const todoPagination = useAppSelector(selectPagination);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(changePage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(changeRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(changePage(0));
  };

  const handleToggleCompleteTodo = (id: number, checked: boolean) => {
    dispatch(toggleCompleted({ id, completed: checked }));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          {!!items?.length && (
            <TableBody>
              {items.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={todo.completed}
                      onChange={(event) =>
                        handleToggleCompleteTodo(todo.id, event.target.checked)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteOutlined
                      color="error"
                      onClick={() => handleDeleteTodo(todo.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!!items?.length && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={total}
          rowsPerPage={todoPagination.rowsPerPage}
          page={todoPagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default TodosTable;
