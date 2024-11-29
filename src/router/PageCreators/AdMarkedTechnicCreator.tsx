import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";
import AdMarkedOne from "../../pages/admin/markedTechnic/markedOne";

export const useAdMarkedTechnicRouter = () => {
    const { addRoute } = useRouter();
    
    const createAdMarkedTechnicRoute = (number: string) => {
        const newTechnic = {
            path: `/admin/markedtechnic${number}`,
            element: <AdMarkedOne number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newTechnic.path);
        if (!exists) {
            pagesData.push(newTechnic);
            addRoute(newTechnic);
        }
    };

    return { createAdMarkedTechnicRoute };
};
