import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/register";

import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Dashboard />} />
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
