import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import "./components/TodoStyle.css";
import Todo from "./components/Todo";
export default function App() {
  let [todos, setTodos] = useState([]);
  const [todoShow, setTodoShow] = useState("all");
  const [toggleAllComplete, setToggleAllComplete] = useState(true);
  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const updateTodoShow = (string) => {
    setTodoShow(string);
  };
  const removeAllTodosCompleted = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      })
    );
  };
  if (todoShow === "active") {
    todos = todos.filter((todo) => !todo.complete);
  } else if (todoShow === "complete") {
    todos = todos.filter((todo) => todo.complete);
  }

  return (
    <>
      <div className="container">
        <TodoForm onSubmit={addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
            toggleComplete={() => toggleComplete(todo.id)}
          />
        ))}
        <div>
          <button
            className="update-btn btn"
            onClick={() => updateTodoShow("all")}
          >
            All
          </button>
          <button
            className="update-btn btn"
            onClick={() => updateTodoShow("active")}
          >
            Active
          </button>
          <button
            className="update-btn btn"
            onClick={() => updateTodoShow("complete")}
          >
            Complete
          </button>
        </div>
        {todos.some((todo) => todo.complete) ? (
          <button onClick={removeAllTodosCompleted} className="btn all-btn">
            Remove all complete todos
          </button>
        ) : null}
        <button
          onClick={() => {
            setTodos(
              todos.map((todo) => ({
                ...todo,
                complete: toggleAllComplete,
              }))
            );
            setToggleAllComplete(!toggleAllComplete);
          }}
          className="btn all-btn"
        >
          Toggle all complete :{`${toggleAllComplete}`}
        </button>
      </div>
    </>
  );
}
