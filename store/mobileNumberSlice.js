// store/mobileNumberSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mobileNumberSlice = createSlice({
    name: 'userProfile',
    initialState: {
        id: null
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setId } = mobileNumberSlice.actions;
export default mobileNumberSlice.reducer;
