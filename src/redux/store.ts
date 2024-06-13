import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import { authReducer } from './authReducer';
import { gadgetReducer } from './gadgetsReducer';


const reducer = combineReducers({
    auth: authReducer,
    gadgets: gadgetReducer
    
})

//store
export const store = configureStore({
    reducer: reducer,
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


