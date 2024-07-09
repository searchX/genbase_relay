import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    projects: [],
}

const findLoadById = (loads, id) => loads.find(load => load.id === id);

const productsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjectsLoaded: (state, action) => {
            state.projects = action.payload;
        },

    }
})

export const {
    setProjectsLoaded,

} = productsSlice.actions;
export default productsSlice.reducer
