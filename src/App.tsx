import { Navigate, Route, Routes } from "react-router-dom";

import { UserTasks, Login, ManagerPage, StatsPage } from "./pages";

export const App = () => {
  const hasAccessToken = localStorage.getItem("access_token") ?? false;
  // 2 разработчик, 3 - менеджер
  const isManager = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "{}")?.role_id === 3
    : false;

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
      <Route
        path="/login"
        element={
          hasAccessToken ? (
            <Navigate
              to={{
                pathname: isManager ? "/management" : "/tasks",
              }}
            />
          ) : (
            <Login />
          )
        }
      />

      {hasAccessToken && (
        <>
          {!isManager && <Route path="/tasks" element={<UserTasks />} />}
          {isManager && <Route path="/management" element={<ManagerPage />} />}
          {isManager && <Route path="/stats" element={<StatsPage />} />}
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
