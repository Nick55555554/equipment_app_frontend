import { createContext, ReactNode, useState } from "react"

export interface authContextType{
    isAuthenticated: boolean;
    setIsAuthenticated: (value:boolean) => void;
}

export const AuthContext = createContext<authContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {}, 
});

export const AuthProvider = ({children}:{ children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <AuthContext.Provider value = {{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
