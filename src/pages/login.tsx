import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await login(email, password);
    if (res && res.success) {
      navigate("/tasks");
      window.location.reload();
    } else if (res && res.message) {
      setError(res.message);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center h-screen ">
      <h1 className="mb-14 text-3xl font-bold">Task Manager</h1>
      <Card className="w-sm max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm ">
        <CardHeader className="space-y-1">
          <div className="flex mb-2"></div>
          <CardTitle className="text-xl font-bold ">Login</CardTitle>
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
            {error && <p className="text-sm text-red-500  ">{error}</p>}

            <div className="text-center">
              <Button className="text-white" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-gray-500 text-center">
          Don't have an account?{" "}
          <span
            className="text-green-500 "
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>{" "}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
