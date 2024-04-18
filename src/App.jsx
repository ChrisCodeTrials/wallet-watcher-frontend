import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";

function App() {
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState(false)


  async function handleLogout() {
    localStorage.removeItem("token");

    await setLogUser(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
      logUser={logUser}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setLogUser={setLogUser} />}
        />
        <Route
          path="/register"
          element={<Register setLogUser={setLogUser}  />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout}/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
