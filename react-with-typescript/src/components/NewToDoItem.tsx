import React, { useRef } from 'react';

const NewToDoItem: React.FC = () => {
  // null for first render
  const textInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputtedText = textInputRef.current!.value;
    console.log(inputtedText)

  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="todo-text">New ToDo</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit">Add new todo</button>
    </form>
  )
}

export default NewToDoItem;
