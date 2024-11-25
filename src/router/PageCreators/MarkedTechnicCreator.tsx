import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";
import MarkedOne from "../../pages/logist/markedTechnic/markedOne/index"

export const useMarkedTechnicRouter = () => {
    const { addRoute } = useRouter();
    
    const createTechnicRoute = (number: string) => {
        const newTechnic = {
            path: `/markedtechnic${number}`,
            element: <MarkedOne number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newTechnic.path);
        if (!exists) {
            pagesData.push(newTechnic);
            addRoute(newTechnic);
        }
    };

    return { createTechnicRoute };
};
