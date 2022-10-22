import {createSlice}  from '@reduxjs/toolkit';

const initialMails = {mails:[], count:0}

const mailSlice = createSlice({
    name:'mail',
    initialState: initialMails,
    reducers:{ 
        storeInBox(state, action){
                state.mails = action.payload
        },
        totalMails(state, action){
            state.mails = action.payload
        },

        setCount(state, action){
            state.count = action.payload
        }
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice.reducer