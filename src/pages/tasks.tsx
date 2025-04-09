import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => alert("Failed to load tasks"));
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.map((t) => (
        <div key={t.id}>{t.title}</div>
      ))}
    </div>
  );
}

export default Tasks;
