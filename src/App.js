import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase";
import Topbar from "./screens/global/Topbar";
import Sidebar from "./screens/global/Sidebar";
import Invites from "./screens/invites";
import Users from "./screens/users";
import Login from "./screens/login";
import UserView from "./screens/users/userView";
import Logout from "./screens/logout";

export const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [user, loading] = useAuthState(auth);

  if (user == null && loading) {
    return null;
  }

  console.log({
    env: process.env.NODE_ENV,
    api: process.env.REACT_APP_GOOGLE_API_KEY,
    version: process.env.REACT_APP_VERSION,
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                {/* <Route index element={<Users />} /> */}
                <Route path="/login" element={<Login />} />
                <Route
                  path="/invites"
                  element={
                    <ProtectedRoute>
                      <Invites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/logout"
                  element={
                    <ProtectedRoute>
                      <Logout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/userView/:id"
                  element={
                    <ProtectedRoute>
                      <UserView />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
