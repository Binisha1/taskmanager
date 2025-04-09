import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await register(email, password);
    if (res && res.success) {
      navigate("/");
    } else if (res && res.message) {
      setError(res.message);
    } else {
      setError("An unknown error occurred.");
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center h-screen ">
      <h1 className="mb-14 text-3xl font-bold">Task Manager</h1>
      <Card className="w-sm max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm ">
        <CardHeader className="space-y-1">
          <div className="flex mb-2"></div>
          <CardTitle className="text-xl font-bold ">Register</CardTitle>
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
            {error && (
              <p className="text-sm text-red-500 text-center ">{error}</p>
            )}
            <div className="text-center">
              <Button className="text-white" type="submit">
                Register
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="text-gray-400">
          Already have an account?
          <p className="text-green-500" onClick={() => navigate("/")}>
            Sign in
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
