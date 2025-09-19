import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../feture/todo/todoSlice.js';

export const store = configureStore({
    reducer:todoReducer
});

