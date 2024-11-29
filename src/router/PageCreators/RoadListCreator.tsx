import RoadList from "../../pages/dispatcher/roadLists/roadList";
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useRoadListRouter = () => {
    const { addRoute } = useRouter();
    
    const createRoadListRoute = (number:string) => {
        const newList = {
            path: `/dispatcher/track/${number}`,
            element: <RoadList number={number} />,
            title: 'Главная Страница'
        };
        const exists = pagesData.some(page => page.path === newList.path);
        if (!exists) {
            pagesData.push(newList);
            addRoute(newList);
        }
    };

    return { createRoadListRoute };
};
