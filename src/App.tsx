import { Navigate, Route, Routes } from "react-router-dom";

import { UserTasks, Login } from "./pages";

export const App = () => {
  const hasAccessToken = true;

  return (
    <Routes>
      <Route
        path=""
        element={
          <Navigate
            to={{
              pathname: `/login`,
            }}
          />
        }
      />
      <Route path="/login" element={<Login />} />

      {hasAccessToken && (
        <>
          <Route path="/tasks" element={<UserTasks />} />
        </>
      )}

      {/* Route for redirect unknown paths */}
      <Route
        path="*"
        element={
          <Navigate
            to={{
              pathname: `/login`,
            }}
          />
        }
      />
    </Routes>
  );
};
