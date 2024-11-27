import { createSlice } from "@reduxjs/toolkit";

const initialState={
    weekDates:[],
    saadhanaDates:[],
    saadhanaStatus:[]
}

const RecordSaadhanaSlice=createSlice({
    name:'RecordSaadhana',
    initialState,
    reducers:{
        setWeekDates:(state,action)=>{
            state.weekDates=action.payload
        },
        setSaadhanaDates:(state,action)=>{
            state.saadhanaDates=action.payload
        },
        setSaadhanaStatus:(state,action)=>{
            state.saadhanaStatus=action.payload
        }
    }
})

export const {setWeekDates,setSaadhanaDates,setSaadhanaStatus}=RecordSaadhanaSlice.actions
export  default RecordSaadhanaSlice.reducer