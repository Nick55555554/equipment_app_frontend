import object from "../../../images/object.png"
import technic from "../../../images/technic.png"
import workerImage from "../../../images/worker.png"
import list from "../../../images/List.png"
import freeApplies from "../../../images/FreeApplies.png"
import question from "../../../images/Question.png"
import markedTechnic from '../../../images/markedTechnic.png'
export const buttons = 
[
    {text: "Мастера бригад",
    icon: <img src={workerImage} alt="Мастера бригад" style={{height:'34px', width:"34px"}}/>,url: "/"},
    {text: "Объекты",icon:<img src={object} alt="Объекты"  style={{height:'34px', width:"34px"}}/>,url: "/objects"},
    {text: "Список техники",icon:<img src={technic} alt="Техника"  style={{height:'34px', width:"36px"}}/>,url: "/technic"},
    {text: "Закреплённая техника",icon:<img src={technic} alt="акреплённая техника"  style={{height:'34px', width:"36px"}}/>,url: "/markedtechnic"},
    {text: "Заявки",icon:<img src={list} alt="Заявки"  style={{height:'36px', width:"34px"}}/>,url: "/applies"},
    {text: "Сводные заявки", icon:<img src={freeApplies} alt="вободные заявки"  style={{height:'34px', width:"34px"}}/>,url: "/summary_applies"},
    {text: "Справочная информация",icon:<img src={question} alt="Справочная информация"  style={{height:'34px', width:"34px"}}/> , url: '/'}
]
export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];