import {ADD_TODO, EPIC_TODO, MAIN_TODO, OTHER_TODO, REMOVE_TODO} from "../constants/Const";


export const addMainTodo = (todoText) => ({
    type: ADD_TODO,
    key: MAIN_TODO,
    todoText
});
export const addEpicTodo = (todoText) => ({
    type: ADD_TODO,
    key: EPIC_TODO,
    todoText
});
export const addOtherTodo = (todoText) => ({
    type: ADD_TODO,
    key: OTHER_TODO,
    todoText
});

export const removeMainTodo = (index) => ({
    type: REMOVE_TODO,
    key: MAIN_TODO,
    index
});

export const removeEpicTodo = (index) => ({
    type: REMOVE_TODO,
    key: EPIC_TODO,
    index
});

export const removeOtherTodo = (index) => ({
    type: REMOVE_TODO,
    key: OTHER_TODO,
    index
});



