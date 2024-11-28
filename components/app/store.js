import  {configureStore} from '@reduxjs/toolkit'
import RecordSaadhanaReducer from './slices/RecordSaadhanaSlice'
import userReducer from './slices/userSlice'

const store=configureStore({
    reducer:{
        RecordSaadhana:RecordSaadhanaReducer,
        user:userReducer
    }
})

export default store