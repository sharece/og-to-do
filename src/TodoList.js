import React from "react";
import { Todo } from "./Todo";
export const TodoList = ({
  todos,
  toggleTodo,
  handleSingleDelete,
  handleUpdate,
}) => (
  <ul>
    {todos.map((todo) => (
      <Todo
        autoFocus
        className="task"
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        handleSingleDelete={handleSingleDelete}
        handleUpdate={handleUpdate}
      />
    ))}
  </ul>
);
