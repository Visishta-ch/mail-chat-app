import {configureStore} from '@reduxjs/toolkit';
import mailSliceReducer from './mailStore-slice';
import authSliceReducer from './auth-slice';

const store = configureStore({
    reducer: {auth: authSliceReducer, mail: mailSliceReducer}
})

export default store;