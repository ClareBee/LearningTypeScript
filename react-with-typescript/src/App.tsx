import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import NewToDoItem from './components/NewToDoItem';

// function component that returns jsx
const App: React.FC = () => {
  const todos = [{ id: 't1', text: 'shopping' }]

  return (
    <div className="App">
      <NewToDoItem />
      <ToDoList items={todos}/>
    </div>
  );
}

export default App;
