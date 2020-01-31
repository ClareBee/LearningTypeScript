import React, { useRef } from 'react';
import './NewToDoItem.css';
interface NewToDoProps {
  onAdd: (text: string) => void;
}

const NewToDoItem: React.FC<NewToDoProps> = props => {
  // null for first render
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputtedText = textInputRef.current!.value;
    props.onAdd(inputtedText);
    textInputRef.current!.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">New ToDo</label>
        <input placeholder="Your new ToDo...." type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit">Add new ToDo</button>
    </form>
  )
}

export default NewToDoItem;
