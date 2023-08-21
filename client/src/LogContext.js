import axios from "axios";
import { createContext,useContext,useEffect,useReducer, useState } from "react";

export const LogContext = createContext(null);;
export const LogContextProvider = ({children}) => {
    const [username,setUsername] = useState(null);

    useEffect(()=>{
        setUsername(localStorage.getItem('username'));
    },[username])
    
    return(
        <LogContext.Provider value={{username,setUsername}}>
            {children}
        </LogContext.Provider>
    )
}