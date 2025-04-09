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

interface TaskProviderProps {
  children: React.ReactNode;
}
export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (): Promise<void> => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setTasks(data);
  };

  const addTask = async ({ id, title, description, completed }: Task) => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, title, description, completed }),
    });
    const response = await res.json();

    if (response.error) {
      console.error(response.error);
      return;
    }

    setTasks((prev) => [...prev, response.task]);
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const toggleTask = (id: string) => {
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
