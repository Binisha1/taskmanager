import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("username");
    // localStorage.removeItem("token");
    navigate("/register");
  };

  const userName = localStorage.getItem("username") || "User";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between w-full relative">
      {/* Avatar & Username */}
      <div className="flex items-center  cursor-pointer">
        <div className="w-9 h-9 flex items-center justify-center rounded-full text-background font-semibold bg-primary">
          {initial}
        </div>
      </div>

      {/* Logout Icon */}
      <button
        onClick={() => navigate("/")}
        className="ml-2 text-foreground hover:cursor-pointer"
      >
        <LogOutIcon />
      </button>
    </div>
  );
};

export default LogOut;
