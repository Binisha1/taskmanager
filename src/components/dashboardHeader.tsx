import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import LogOut from "./logout";

export function DashboardHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur-sm dark:bg-gray-950/90 dark:border-gray-800">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500 to-teal-500 flex items-center justify-center">
            <span className="font-bold text-white">T</span>
          </div>
          <span className="font-bold text-xl hidden md:inline-block">
            TaskMaster
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <LogOut />
          <span>Logout</span>
        </div>
      </div>
    </header>
  );
}
