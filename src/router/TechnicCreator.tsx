import Technic from "../pages/logist/technics/technic";
import pagesData from "./pagesData";
import { useRouter } from "./RouterContext";

export const useTechnicRouter = () => {
    const { addRoute } = useRouter();
    
    const createTechnicRoute = (number: string) => {
        const newTechnic = {
            path: `/technic${number}`,
            element: <Technic number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newTechnic.path);
        if (!exists) {
            pagesData.push(newTechnic);
            addRoute(newTechnic);
            console.log('Создано', pagesData);
        }
    };

    return { createTechnicRoute };
};
