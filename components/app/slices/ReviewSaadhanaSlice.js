import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    saadhanaData: {},
    userName:{}
};

const ReviewSaadhanaSlice=createSlice({
    name:'ReviewSaadhana',
    initialState,
    reducers:{
        setSaadhanaData:(state,action)=>{
            const{userId,data}=action.payload
            state.saadhanaData[userId]=data;
        },
        setuserName:(state,action)=>{
            const{userId,name}=action.payload
            state.userName[userId]=name;
        }
    }
})

export const {setSaadhanaData,setuserName}=ReviewSaadhanaSlice.actions
export default ReviewSaadhanaSlice.reducer