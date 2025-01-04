import  {configureStore} from '@reduxjs/toolkit'
import RecordSaadhanaReducer from './slices/RecordSaadhanaSlice'
import userReducer from './slices/userSlice'
import ReviewSaadhanaReducer from './slices/ReviewSaadhanaSlice'

const store=configureStore({
    reducer:{
        RecordSaadhana:RecordSaadhanaReducer,
        user:userReducer,
        ReviewSaadhana:ReviewSaadhanaReducer
    }
})

export default store