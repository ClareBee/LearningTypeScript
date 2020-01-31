import React from 'react';

interface ToDoListProps {
  items: { id: string, text: string }[]
}
const ToDoList: React.FC<ToDoListProps> = props => {
  return <ul>
  {
    props.items.map(item => <li key={item.id}>{item.text}</li>)
  }</ul>
};

export default ToDoList;
