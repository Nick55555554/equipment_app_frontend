import Applies from "../pages/logist/applies/Applies";
import Home from "../pages/logist/home"
import AdminHome from "../pages/admin/home";
import Auth from "../pages/auth";
import Objects from "../pages/logist/objects/Objects";
import Technics from "../pages/logist/technics"
import Notifyes from "../pages/notifyes";
import Summary_applies from "../pages/logist/summary_applies";
import Divisions from "../pages/dispatcher/divisions";
import Contractors from "../pages/dispatcher/contractors";
import TechnicsDis  from "../pages/dispatcher/technics/TechnicsDis";
import MarkedTechnic from "../pages/logist/markedTechnic";
import RoadLists from "../pages/dispatcher/roadLists/index";
import DisSummary_applies from "../pages/dispatcher/summary_applies/index";
import { AdRoadLists } from "../pages/admin/AdRoadLists";
import AdObjects from "../pages/admin/objects";
import AdTechnics from "../pages/admin/technics";
import AdMarkedTechnic from "../pages/admin/markedTechnic";
import HelpInfo from "../pages/HelpInfo";

export interface routerType{
    title:string;
    path: string;
    element:JSX.Element;
    nmbr?:number
}
const initialPagesData: routerType[] = [
    {
        title:'Главная Страница',
        path:"/helpinfo",
        element:<HelpInfo/>,
    },
    {
        title:'Главная Страница',
        path:"/",
        element:<Home/>,
    },
    {
        title:'Главная Страница',
        path:"/admin/objects",
        element:<AdObjects/>,
    },
    {
        title:'Главная Страница',
        path:"/admin/tracks",
        element:<AdRoadLists/>,
    },
    {
        title:'Главная Страница',
        path:"/admin/technics",
        element:<AdMarkedTechnic/>,
    },

    {
        title:'Главная Страница',
        path:"/admin/markedtechnic",
        element:<AdTechnics/>,
    },
    {
        path:"/applies",
        element:<Applies/>,
        title:'Заявки'
    },
    {
        path:"/admin",
        element:<AdminHome/>,
        title:'Главная Страница'
    },
    {
        path:"/auth",
        element:<Auth/>,
        title:'Вход'
    },
    {
        path:"/objects",
        element:<Objects/>,
        title:'Объекты'
    },
    {
        path:"/technic",
        element:<Technics/>,
        title:'Техника'
    },
    {
        path:"/markedtechnic",
        element:<MarkedTechnic/>,
        title:'Техника'
    },
    {
        path:"/notifyes",
        element:<Notifyes/>,
        title:'Уведомления'
    },
    {
        path:"/summary_applies",
        element:<Summary_applies/>,
        title:'Сводные заявки'
    },
    {
        path:"/dispatcher/contractors",
        element:<Contractors/>,
        title:'Подрядчики'
    },
    {
        path:"/dispatcher/summary_applies",
        element:<DisSummary_applies/>,
        title:'Сводные заявки'
    },
    {
        path:"/dispatcher/divisions",
        element:<Divisions/>,
        title:'Подразделения'
    },
    {
        path:"/dispatcher/technics",
        element:<TechnicsDis/>,
        title:'Техника'
    },
    {
        path:"/dispatcher",
        element:<RoadLists/>,
        title:'Путевые листы'
    },

]
export default initialPagesData;
