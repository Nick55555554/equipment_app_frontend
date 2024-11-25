import { createContext, ReactNode, useContext, useState } from "react";
import initialPagesData, { routerType } from "./pagesData";

interface RouterContextType {
    pagesData: routerType[];
    addRoute: (newRoute: routerType) => void;
}
const RouterContext = createContext<RouterContextType | null>(null);


export const RouterProvider = ({children} : {children : ReactNode}) => {
    const [pagesData,setPagesData] = useState<routerType[]>(initialPagesData);
    
    const addRoute = (newRoute: routerType) => {
        setPagesData((prev) => [...prev, newRoute]);
    };
    return(
        <RouterContext.Provider value={{pagesData,addRoute}}>
            {children}
        </RouterContext.Provider>
    )
}

export const useRouter = () => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useRouter must be used within a RouterProvider");
    }
    return context;
};