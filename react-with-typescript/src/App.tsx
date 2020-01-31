import React, { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import NewToDoItem from './components/NewToDoItem';
import { Todo } from './models/todo.model';
// function component that returns jsx
const App: React.FC = () => {
  const initialTodos = [{ id: 't1', text: 'shopping' }]
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addHandler = (text: string) => {
    const newTodo = { id: Math.random().toString(), text: text }
    // prevTodos will be latest state snapshot
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const deleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }

  return (
    <div className="App">
      <NewToDoItem onAdd={addHandler} />
      <ToDoList items={todos} onDelete={deleteHandler}/>
    </div>
  );
}

export default App;
