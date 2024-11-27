import  {configureStore} from '@reduxjs/toolkit'
import RecordSaadhanaReducer from './slices/RecordSaadhanaSlice'

const store=configureStore({
    reducer:{
        RecordSaadhana:RecordSaadhanaReducer
    }
})

export default store