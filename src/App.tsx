import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/register";

import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Dashboard />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
