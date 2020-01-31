import { RequestHandler } from 'express';
import { ToDo } from '../models/todo';
const TODOS: ToDo[] = []
export const createToDo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newToDo = new ToDo(Math.random().toString(), text);

  TODOS.push(newToDo);
  res.status(201).json({ message: 'successfully created', createdTodo: newToDo });
};

export const getToDos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS })
};

// use generic type as we know we'll get id
export const updateToDo: RequestHandler<{ id: string }> = (req, res, next) => {
  const toDoId = req.params.id;
  // type casting as we know what we should get
  const updatedText = (req.body as { text: string }).text;

  const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId);

  if(toDoIndex < 0) {
    throw new Error('could not find ToDo')
  }
  TODOS[toDoIndex] = new ToDo(TODOS[toDoIndex].id, updatedText);

  res.status(204).json({ message: 'updated!', updatedToDo: TODOS[toDoIndex]})
};

export const deleteToDo: RequestHandler = (req, res, next) => {
  const toDoId = req.params.id;
  const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId);

  if(toDoIndex < 0) {
    throw new Error('could not find ToDo')
  }
  TODOS.splice(toDoIndex, 1);
  res.status(204).json({ message: 'deleted' });
}
