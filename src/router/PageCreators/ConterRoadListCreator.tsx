
import ConterLockedRoadList from "../../pages/dispatcher/roadLists/roadList/ConterLockedRoadList";
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useConterLockedRoadListRouter = () => {
    const { addRoute } = useRouter();
    
    const createConterLockedRoadListRoute = (number:string) => {
        const newList = {
            path: `/conterlockedroadList${number}`,
            element: <ConterLockedRoadList number={number} />,
            title: 'Главная Страница'
        };
        const exists = pagesData.some(page => page.path === newList.path);
        if (!exists) {
            pagesData.push(newList);
            addRoute(newList);
        }
    };

    return { createConterLockedRoadListRoute };
};
