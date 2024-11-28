import DisTechnic from "../../pages/dispatcher/technics/technic";
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useDisTechnicRouter = () => {
    const { addRoute } = useRouter();
    
    const createDisTechnicRoute = (number: string) => {
        const newMarkedTechnic = {
            path: `/dispatcher/markedtechnic${number}`,
            element: <DisTechnic number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newMarkedTechnic.path);
        if (!exists) {
            pagesData.push(newMarkedTechnic);
            addRoute(newMarkedTechnic);
        }
    };

    return { createDisTechnicRoute };
};
