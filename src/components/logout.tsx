import { useAuth } from "@/context/AuthContext";
import { LogOutIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between w-full relative">
      {/* Avatar & Username */}
      <div className="flex items-center  cursor-pointer">
        <div className="w-9 h-9 flex items-center justify-center rounded-full text-background font-semibold bg-primary">
          <User />
        </div>
      </div>

      {/* Logout Icon */}
      <button
        onClick={handleLogout}
        className="ml-2 text-foreground hover:cursor-pointer"
      >
        <LogOutIcon />
      </button>
    </div>
  );
};

export default LogOut;
