import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import { store } from "./redux/store";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Provider>
  );
};

export default App;
