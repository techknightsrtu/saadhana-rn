import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dates: [],
    scores: [],
}

const GraphDataSlice = createSlice({
    name: 'GraphData',
    initialState,
    reducers: {
        setDatesAndScores: (state, action) => {
            state.dates = action.payload.dates;
            state.scores = action.payload.scores;
        },
    }
})

export const { setDatesAndScores } = GraphDataSlice.actions
export default GraphDataSlice.reducer