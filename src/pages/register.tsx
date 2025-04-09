import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✨ error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await register(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
      <CardHeader className="space-y-1">
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
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}
        </form>
      </CardContent>

      <CardFooter className="text-gray-400">
        Already have an account?
        <Button onClick={() => navigate("/")}>Sign in</Button>
      </CardFooter>
    </Card>
  );
}

export default Register;
