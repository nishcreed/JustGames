import { createContext,useReducer } from "react";

export const LogContext = createContext(null);

const logReducer = (state,action) =>{
    switch(action.type) {
        case 'login':{
            localStorage.setItem('username',action.username)
            return {username:action.username}
        }
        case 'logout':
            return {username:''}
        default:
            return state
    }
}

export const LogContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(logReducer,{
        username:''
    })

    console.log(state);

    return(
        <LogContext.Provider value={{...state,dispatch}}>
            {children}
        </LogContext.Provider>
    )
}