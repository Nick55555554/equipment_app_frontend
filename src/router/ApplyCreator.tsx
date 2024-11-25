import Apply from "../pages/logist/applies/apply/index";
import pagesData from "./pagesData";
import { useRouter } from "./RouterContext";

export const useApplyRouter = () => {
    const { addRoute } = useRouter();
    
    const createApplyRoute = (number:string) => {
        const newApply = {
            path: `/apply${number}`,
            element: <Apply number={number} />,
            title: 'Главная Страница'
        };
        const exists = pagesData.some(page => page.path === newApply.path);
        if (!exists) {
            pagesData.push(newApply);
            addRoute(newApply);
        }
    };

    return { createApplyRoute };
};
