import React from "react";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { TodoList } from "./TodoList";

// const url = "http://jsonplaceholder.typicode.com/todos";
const storageKey = "todoApp.todos";

export const App = () => {
  const [todos, setTodos] = useState([]);
  // const [userData, setUserData] = useState({});
  const input = useRef();

  // useEffect(() => {
  //   fetch(url)
  //     .then((result) => result.json())
  //     .then((data) => setUserData(data));
  // }, []);

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem(storageKey));
    if (localTodos) setTodos((prevTodos) => [...prevTodos, ...localTodos]);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, complete: !todo.complete };
      })
    );
  };

  const handleAdd = (evt) => {
    evt.preventDefault();
    const name = input.current.value;
    if (name === "") return;
    setTodos((todo) => {
      return [...todo, { id: uuidv4(), name, complete: false }];
    });
    input.current.value = "";
  };

  const handleDelete = () => {
    setTodos((todos) => todos.filter((todo) => !todo.complete));
  };

  const handleSingleDelete = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  //creating newtodo that filters out incomplete to dos and sets them to new to dos

  const handleUpdate = (id, name) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, name };
      })
    );
  };

  // const newTodos = [...todos];
  // const todo = newTodos.find((todo) => todo.id === id);
  // todo.complete = !todo.complete;
  // setTodos(newTodos);
  return (
    <div className="App">
      <form onSubmit={handleAdd}>
        <input id="task" ref={input} />
        <button type="submit" className="btn">
          Add To do
        </button>
        <button className="btn" onClick={handleDelete}>
          Clear completed to-dos
        </button>
      </form>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        handleSingleDelete={handleSingleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
