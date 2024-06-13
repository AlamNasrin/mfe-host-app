export interface AuthState{

    isAuthenticated: boolean;
    userName: string;
    accessToken: string;
    refreshToken: string;
}

//initial state
const initialState: AuthState = {
    isAuthenticated: false,
    userName: '',
    accessToken: '',
    refreshToken: ''
}
//reducer
export const authReducer = (currentState: AuthState=initialState, action: any) => {

    debugger;
    //action to login {type: "login", payload: {authState}}
    if(action.type === "login"){
        return {
            ...currentState,
            isAuthenticated: true,
            userName: action.payload.userName,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken
        }   
    }
    //action to logout {type: "logout"}
    if(action.type === "logout"){
        return {
            ...currentState,
            isAuthenticated: false,
            userName: '',
            accessToken: '',
            refreshToken: ''
        }
    }



    //return the updated state
    return currentState;
}