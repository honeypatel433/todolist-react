import React, { useState } from 'react'
import TodoInput from './components/TodoInput'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    if (editId) {
     
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputText } : todo
        )
      );
      setEditId(null);
    } else {
   
      setTodos([...todos, { id: Date.now(), text: inputText }]);
    }

    setInputText("");
  };

  const editTodo = (todo) => {
    setInputText(todo.text); 
    setEditId(todo.id);      
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Todo List
        </h1>

        <TodoInput inputText={inputText}  setInputText={setInputText}  handleSubmit={handleSubmit}  editId={editId}
        />
        <table className="w-full border mt-6">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">Id</th>
              <th className="p-2 border">Task</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{todo.text}</td>
                <td className="p-2 border text-center space-x-2">
                  <button onClick={() => editTodo(todo)}  className="bg-blue-500 text-white px-2 py-1 rounded"
                  >  Edit </button>
                  <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded"
                  >Delete</button>
                </td>
              </tr>
            ))}

            {todos.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-3 text-gray-400">
                  No Tasks Yet
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
