import Technic from "../../pages/logist/technics/technic/index";
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useTechnicRouter = () => {
    const { addRoute } = useRouter();
    
    const createTechnicRoute = (number: string) => {
        const newMarkedTechnic = {
            path: `/technic${number}`,
            element: <Technic number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newMarkedTechnic.path);
        if (!exists) {
            pagesData.push(newMarkedTechnic);
            addRoute(newMarkedTechnic);
        }
    };

    return { createTechnicRoute };
};
