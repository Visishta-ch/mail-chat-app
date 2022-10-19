import {createSlice} from '@reduxjs/toolkit'

const initialAuthState = {
    token: '',
    isLogin: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        login(state,action){
            const token = action.payload;
            state.token = token;
            state.isLogin = true;
            console.log(state.token)
            localStorage.setItem('tokenId', action.payload)
        },
        logout(state,action){
            state.isLogin = false;
            localStorage.removeItem('tokenId')
        },
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer;