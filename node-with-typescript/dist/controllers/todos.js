"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../models/todo");
const TODOS = [];
exports.createToDo = (req, res, next) => {
    const text = req.body.text;
    const newToDo = new todo_1.ToDo(Math.random().toString(), text);
    TODOS.push(newToDo);
    res.status(201).json({ message: 'successfully created', createdTodo: newToDo });
};
exports.getToDos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
// use generic type as we know we'll get id
exports.updateToDo = (req, res, next) => {
    const toDoId = req.params.id;
    // type casting as we know what we should get
    const updatedText = req.body.text;
    const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId);
    if (toDoIndex < 0) {
        throw new Error('could not find ToDo');
    }
    TODOS[toDoIndex] = new todo_1.ToDo(TODOS[toDoIndex].id, updatedText);
    res.status(204).json({ message: 'updated!', updatedToDo: TODOS[toDoIndex] });
};
exports.deleteToDo = (req, res, next) => {
    const toDoId = req.params.id;
    const toDoIndex = TODOS.findIndex(todo => todo.id === toDoId);
    if (toDoIndex < 0) {
        throw new Error('could not find ToDo');
    }
    TODOS.splice(toDoIndex, 1);
    res.status(204).json({ message: 'deleted' });
};
