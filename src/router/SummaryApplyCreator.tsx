import Summary_Apply from "../pages/logist/summary_applies/summary_apply";
import pagesData from "./pagesData";
import { useRouter } from "./RouterContext";

export const useSummaryApplyRouter = () => {
    const { addRoute } = useRouter();
    
    const createSummaryApplyRoute = (number: string) => {
        const newSummaryApply = {
            path: `/summary_apply${number}`,
            element: <Summary_Apply number={number} />,
            title: 'Главная Страница'
        };

        const exists = pagesData.some(page => page.path === newSummaryApply.path);
        if (!exists) {
            pagesData.push(newSummaryApply);
            addRoute(newSummaryApply);
        }
    };

    return { createSummaryApplyRoute };
};
