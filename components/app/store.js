import  {configureStore} from '@reduxjs/toolkit'
import RecordSaadhanaReducer from './slices/RecordSaadhanaSlice'
import userReducer from './slices/userSlice'
import ReviewSaadhanaReducer from './slices/ReviewSaadhanaSlice'
import FeedbackReducer from './slices/FeedbackSlice'
import GraphDataReducer from './slices/GraphDataSlice'

const store=configureStore({
    reducer:{
        RecordSaadhana:RecordSaadhanaReducer,
        user:userReducer,
        ReviewSaadhana:ReviewSaadhanaReducer,
        Feedback:FeedbackReducer,
        GraphData:GraphDataReducer
    }
})

export default store