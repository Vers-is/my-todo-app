import { useState } from "react";
import "./App.css";
import "./index.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setInput("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <main>
      <h1 className="title">TODOS ✎</h1>
      <div className="main_container">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <div className="todos">
          {todos
            .filter((todo) => {
              if (filter === "active") return !todo.completed;
              if (filter === "completed") return todo.completed;
              return true;
            })
            .map((todo) => (
              <div
                key={todo.id}
                className="todo-item"
                onClick={() => toggleTodo(todo.id)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  textAlign: "center",
                  gap: "10px",
                  color: todo.completed ? "var(--grey)" : "white",
                }}>
                <span
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    border: "2px solid var(--accent)",
                    borderColor: todo.completed
                      ? "var(--grey)"
                      : "var(--accent)",
                    color: "var(--grey)",
                    userSelect: "none",
                  }}>
                  {todo.completed ? "✓" : ""}
                </span>
                {todo.text}
              </div>
            ))}
        </div>
        <div className="panel">
          <div className="left-items">
            {todos.filter((t) => !t.completed).length} items left
          </div>
          <div className="options">
            <div
              id="option-all"
              className={`option ${filter === "all" ? "selected" : ""}`}
              onClick={() => setFilter("all")}>
              all
            </div>
            <div
              id="option-active"
              className={`option ${filter === "active" ? "selected" : ""}`}
              onClick={() => setFilter("active")}>
              active
            </div>
            <div
              id="option-completed"
              className={`option ${filter === "completed" ? "selected" : ""}`}
              onClick={() => setFilter("completed")}>
              completed
            </div>
          </div>
          <button
            className="clear"
            onClick={() => setTodos(todos.filter((t) => !t.completed))}>
            clear completed
          </button>
        </div>
      </div>
    </main>
  );
}
