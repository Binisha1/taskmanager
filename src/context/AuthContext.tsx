import { createContext, useContext, useState, ReactNode } from "react";
interface AuthContextType {
  user: any;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const REACT_APP_API_URL = "https://taskmanagerbackend-6gow.onrender.com";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const deployUrl = REACT_APP_API_URL || "http://localhost:5000";
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${deployUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    if (data.access_token) {
      console.log(data);
      // Store the token in localStorage
      localStorage.setItem("access_token", data.access_token);
      console.log("Logged in successfully");
    } else {
      console.error(data.message);
    }
    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    setUser(data);
    return { success: true };
  };

  const register = async (email: string, password: string) => {
    const res = await fetch(`${deployUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
    }

    return { success: true, message: "Registration successful" };
  };

  const logout = async () => {
    localStorage.removeItem("access_token");
    setUser(null);
    window.location.reload(); // Or navigate to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
