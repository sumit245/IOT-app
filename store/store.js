// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import mobileNumberReducer from './mobileNumberSlice';

export const store = configureStore({
    reducer: {
        id: mobileNumberReducer,
    },
});
