import React from 'react';

interface ToDoListProps {
  items: { id: string, text: string }[],
  onDelete: (id: string) => void
}
const ToDoList: React.FC<ToDoListProps> = props => {
  return <ul>
  {
    props.items.map(item => <li key={item.id}>
      <span>{item.text}</span>
      <button onClick={props.onDelete.bind(null, item.id)}>Delete Todo</button>
      </li>)
  }</ul>
};

export default ToDoList;
