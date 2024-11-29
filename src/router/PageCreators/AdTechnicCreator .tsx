import AdTechnic from "../../pages/admin/technics/technic";
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useAdTechnicRouter = () => {
    const { addRoute } = useRouter();
    
    const createAdTechnicRoute = (number: string) => {
        const newMarkedTechnic = {
            path: `/admin/technic${number}`,
            element: <AdTechnic number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newMarkedTechnic.path);
        if (!exists) {
            pagesData.push(newMarkedTechnic);
            addRoute(newMarkedTechnic);
        }
    };

    return { createAdTechnicRoute };
};
