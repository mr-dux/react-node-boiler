import {ADD_TODO, REMOVE_TODO} from "../constants/Const";

const defaultMainTableState = {
    mainTodos: ["Buy bread"],
    epicTodos: ["Fly into space"],
    otherTodos: ["Throw away trash"]
};

export default (state = defaultMainTableState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return addToDo(state, action.todoText, action.key);
        case REMOVE_TODO:
            return removeTodo(state, action.index, action.key);
        default:
            return state;
    }
}

const addToDo = (state, todoText, key) => {
    const newState = {...state};
    newState[key] = [todoText, ...state[key]];
    return newState;
};

const removeTodo = (state, index, key) => {
    const oldTodos = state[key];
    let newTodos = [];
    oldTodos.forEach((item, i)=>{
        if (i === 0) return;
        newTodos.push(item);
    });
    const newState = {...state};
    newState[key] = newTodos;
    return newState;
};
