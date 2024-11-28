import DisSummary_Apply from "../../pages/dispatcher/summary_applies/summary_apply/DisSummary_Apply";
import pagesData from "../pagesData";
import { useRouter } from "../RouterContext";

export const useDisSummaryApplyRouter = () => {
    const { addRoute } = useRouter();
    
    const createDisSummaryApplyRoute = (number: string, state: string) => {
        const newSummaryApply = {
            path: `/dispatcher/summary_apply${number}`,
            element: <DisSummary_Apply number={number} state={state} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newSummaryApply.path);
        if (!exists) {
            pagesData.push(newSummaryApply);
            addRoute(newSummaryApply);
        }
    };

    return { createDisSummaryApplyRoute };
};
