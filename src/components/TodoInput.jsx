import React from 'react'

function TodoInput({ inputText, setInputText, handleSubmit, editId }) {
  return (
    <div className="flex gap-2 mb-4">
      <input type="text" placeholder="Enter Task" value={inputText} onChange={(e) => setInputText(e.target.value)}
        className="flex-1 border px-3 py-2 rounded"
      />
       <button onClick={handleSubmit} className={`px-4 py-2 rounded text-white ${editId ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
      {editId ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TodoInput;
