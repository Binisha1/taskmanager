import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext({
  tasks: { title: "", description: "", completed: false, id: "" },
  addTask: (title: string, description: string) => {},
  deleteTask: (id: string) => {},
  toggleTask: (id: string) => {},
});

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      credentials: "include",
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async ({ title, description }) => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description }),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
