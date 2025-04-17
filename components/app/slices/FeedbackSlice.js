import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbackData: {},
    feedbackStatus: false
}

const FeedbackSlice = createSlice({
    name: 'Feedback',
    initialState,
    reducers: {
        setFeedbackData: (state, action) => {
            state.feedbackData = action.payload
        },
        clearFeedback: (state) => {
            state.feedbackData = []; // Clear feedback data
        }

    }
})

export const { setFeedbackData, clearFeedback } = FeedbackSlice.actions
export default FeedbackSlice.reducer