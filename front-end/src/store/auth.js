import { createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
                            isAuthenticated:false,
                            id:null
                         }


const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.id=action.payload.id
        },
        logout(state){
            state.isAuthenticated=false;
            state.id=null
        }
    }
}) 

export const authActions = authSlice.actions;

export default authSlice.reducer;