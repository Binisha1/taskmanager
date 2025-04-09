import { createContext, useContext, useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [{ id: "", title: "", description: "", completed: false }],
  addTask: async () => {},
  deleteTask: () => {},
  toggleTask: () => {},
});

export const useTasks = () => useContext(TaskContext);

const REACT_APP_API_URL = "https://taskmanagerbackend-6gow.onrender.com";

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const deployUrl = REACT_APP_API_URL || "http://localhost:5000";
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    fetchTasks();
  }, []); // Only run fetchTasks once when the component mounts

  const fetchTasks = async (): Promise<void> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch(`${deployUrl}/api/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      const data = await res.json();

      if (res.ok) {
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async ({ id, title, description, completed }: Task) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch(`${deployUrl}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, title, description, completed }),
      });
      const response = await res.json();

      if (res.ok) {
        setTasks((prev) => [...prev, response.task]);
      } else {
        console.error("Failed to add task:", response.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await fetch(`${deployUrl}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } else {
        const data = await res.json();
        console.error("Failed to delete task:", data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
