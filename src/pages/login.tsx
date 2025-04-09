import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(email, password);
    if (res.success) {
      navigate("/tasks");
    } else {
      setError(res.message);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2"></div>
        <CardTitle className="text-2xl font-bold text-center">
          TaskMaster
        </CardTitle>
        <CardDescription className="text-center">
          Manage your tasks efficiently
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="email">Password</Label>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        {error && (
          <p className="text-sm text-red-500 text-center mt-2">{error}</p>
        )}
      </CardContent>
      <CardFooter className="text-gray-400">
        Don't have an account?
        <Button onClick={() => navigate("/register")}>Sign up</Button>{" "}
      </CardFooter>
    </Card>
  );
}

export default Login;
