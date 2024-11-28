import Contractor from "../../pages/dispatcher/contractors/contractor/index"
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useContractRouter = () => {
    const { addRoute } = useRouter();
    
    const createContractRoute = (number:string) => {
        const newContractor = {
            path: `/contractor${number}`,
            element: <Contractor number={number} />,
            title: 'Главная Страница'
        };
        const exists = pagesData.some(page => page.path === newContractor.path);
        if (!exists) {
            pagesData.push(newContractor);
            addRoute(newContractor);
        }
    };

    return { createContractRoute };
};
