import { useState } from "react";
export const Todo = ({
  todo,
  handleSingleDelete,
  toggleTodo,
  handleUpdate,
}) => {
  const [edit, setEdit] = useState(false);

  const handleEnterKey = (e) => {
    if (e.key !== "Enter") return;
    setEdit(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => toggleTodo(todo.id)}
      />
      {""}
      {edit ? (
        <input
          autoFocus
          value={todo.name}
          onBlur={() => setEdit(false)}
          onChange={(e) => handleUpdate(todo.id, e.target.value)}
          onKeyDown={handleEnterKey}
        />
      ) : (
        <span onClick={() => setEdit(true)}>{todo.name}</span>
      )}
      <button onClick={() => handleSingleDelete(todo.id)}>X</button>
    </li>
  );
};
