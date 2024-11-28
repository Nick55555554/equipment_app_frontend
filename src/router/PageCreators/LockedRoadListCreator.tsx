
import LockedRoadList from "../../pages/dispatcher/roadLists/roadList/LockedRoadList";

import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useLockedRoadListRouter = () => {
    const { addRoute } = useRouter();
    
    const createLockedRoadListRoute = (number:string) => {
        const newList = {
            path: `/lockedroadList${number}`,
            element: <LockedRoadList number={number} />,
            title: 'Главная Страница'
        };
        const exists = pagesData.some(page => page.path === newList.path);
        if (!exists) {
            pagesData.push(newList);
            addRoute(newList);
        }
    };

    return { createLockedRoadListRoute };
};
