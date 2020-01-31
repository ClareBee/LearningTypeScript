import React from 'react';
import './ToDoList.css';

interface ToDoListProps {
  items: { id: string, text: string }[],
  onDelete: (id: string) => void
}
const ToDoList: React.FC<ToDoListProps> = props => {
  return <ul className="todo-list">
  {
    props.items.map(item => <li className="todo-item" key={item.id}>
      <span>{item.text}</span>
      <button onClick={props.onDelete.bind(null, item.id)}>Delete ToDo</button>
      </li>)
  }</ul>
};

export default ToDoList;
