import { createContext, ReactNode, useState } from "react"

export interface authContextType{
    isAuthenticated: boolean;
    setIsAuthenticated: (value:boolean) => void;
    name: string;
    setName: (name: string) => void;
    status: string;
    setStatus: (name: string) => void;

}

export const AuthContext = createContext<authContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {}, 
    name: "",
    setName: () => {},
    status: "",
    setStatus: () => {}
});

export const AuthProvider = ({children}:{ children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, name, setName,status, setStatus  }}>
            {children}
        </AuthContext.Provider>
    )
}
