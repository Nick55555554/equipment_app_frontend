import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { routerType } from "./pagesData"
import { useRouter } from "./RouterContext";
import { useEffect } from "react";
import { useApplyRouter } from "./PageCreators/ApplyCreator";


const Router = () => {
    const{ pagesData } = useRouter();
    const {createApplyRoute} = useApplyRouter();
    const location = useLocation();


    useEffect(()=>{
        if(!pagesData.some((page) => page.path === location.pathname)){
            const numbers = location.pathname.match(/\d+/g);
            if(numbers){
                const result = numbers.map(Number).join(',');
                createApplyRoute(result);
            }
        }
    },[location.pathname]);


    const PageRoutes = pagesData.map(({path, title, element}: routerType) => {
        return <Route key={title} path = {`/${path}`} element = {element}/>;
    });
    return <Routes>{PageRoutes}</Routes>;
}
export default Router;