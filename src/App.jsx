import React, { useEffect, useMemo, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = () => {
    setError("");
    if (!inputText.trim()) {
      setError("Task cannot be empty");
      return;
    }
    const isDuplicate = todos.some(
      (todo) =>
        todo.text.toLowerCase() === inputText.toLowerCase() &&
        todo.id !== editId
    );
    if (isDuplicate) {
      setError("Task already exists");
      return;
    }
    const newTask = { id: editId || Date.now(), text: inputText, status, date, time, };

    if (editId) {
      setTodos(todos.map((t) => (t.id === editId ? newTask : t)));
      setEditId(null);
    } else {
      setTodos([...todos, newTask]);
    }
    setInputText("");
    setStatus("Pending");
    setDate("");
    setTime("");
  };

  const editTodo = (todo) => { setInputText(todo.text); setStatus(todo.status); setDate(todo.date); setTime(todo.time);
    setEditId(todo.id)  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aDateTime = new Date(`${a.date} ${a.time}`);
        const bDateTime = new Date(`${b.date} ${b.time}`);
        return aDateTime - bDateTime;
      });
  }, [todos, search]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Todo List
        </h1>

        <input type="text" placeholder="Search task..."  value={search}  onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4" />

        <div className="grid md:grid-cols-5 gap-2 mb-2">
          <input  type="text" placeholder="Enter task" value={inputText} onChange={(e) => setInputText(e.target.value)}
            className="border p-2 rounded col-span-2" />

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
            <option>Pending</option>
            <option>Progress</option>
            <option>Completed</option>
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />

          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded"
          />
        </div>

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded mb-2" >
          {editId ? "Update Task" : "Add Task"}
        </button>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <table className="w-full border">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">Id</th>
              <th className="p-2 border">Task</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo, index) => (
              <tr key={todo.id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{todo.text}</td>
                <td className="p-2 border text-center">{todo.status}</td>
                <td className="p-2 border text-center">{todo.date || "—"}</td>
                <td className="p-2 border text-center">{todo.time || "—"}</td>
                <td className="p-2 border text-center space-x-2">
                  <button onClick={() => editTodo(todo)} className="bg-blue-500 text-white px-2 py-1 rounded"
                  > Edit</button>
                  <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded"
                  >Delete</button>
                </td>
              </tr>
            ))}

            {filteredTodos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-3 text-gray-400">
                  No tasks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
