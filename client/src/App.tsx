import React, { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tasks", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
