import { Navigate, Route, Routes } from "react-router-dom";

import { UserTasks, Login, ManagerPage, StatsPage } from "./pages";
import { ROLE_ID_ENUM } from "./entities/user";

export const App = () => {
  const hasAccessToken = localStorage.getItem("access_token") ?? false;
  const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  const isManager = !!currentUser
    ? currentUser?.role_id === ROLE_ID_ENUM.MANAGER ||
      currentUser?.role_id === ROLE_ID_ENUM.TESTER
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
