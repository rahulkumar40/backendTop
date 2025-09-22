import { createSlice,nonoid } from "@reduxjs/toolkit";
// nonoid --> generate unique id 

const initialState = {
    todos:[{id:1, text:"Hello word"},],
}

function sayHello(){
    console.log("Hello Say ")
}
export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        // properties and function 
        // properties --> add todo 
        // state --> intial state control or details }} current state 
        // action --> delete id = 2 this is given through action --> jo remove krna hoata hai
        // payload is a object which consist data  
        addTodo : (state, action)=>{
            const todo = {
                // id:Date.now(),
                id:nonoid(),
                text:action.payload
            }
            state.todos.push(todo);
        },
        removeTodo:(state, action)=>{
            state.todos = state.todos.filter((todo)=>todo.id!==action.payload);
        }
    }
})

export  const {addTodo,removeTodo} = todoSlice.actions; // method 
export default todoSlice.reducer; // add architecure deteails 