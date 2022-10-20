import {createSlice}  from '@reduxjs/toolkit';

const initialMails = {mails:[]}

const mailSlice = createSlice({
    name:'mail',
    initialState: initialMails,
    reducers:{ 
        storeInBox(state, action){
                state.mails = action.payload
        },
        totalMails(state, action){
            state.mails = action.payload
        }
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice.reducer