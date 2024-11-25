import divisions from "../../../images/object.png"
import listOfTechnic from "../../../images/List.png"
import freeApplies from "../../../images/FreeApplies.png"
import question from "../../../images/Question.png"
import contractors from "../../../images/contractors.png"

export const buttons = 
[
    {text: "Подразделения",
    icon: <img src={divisions} alt="Подразделения" style={{height:'34px', width:"34px"}}/>,url: "/dispatcher"},
    {text: "Список техники",icon:<img src={listOfTechnic} alt="Список техники"  style={{height:'36px', width:"34px"}}/>,url: "/applies"},
    {text: "Сводные заявки", icon:<img src={freeApplies} alt="вободные заявки"  style={{height:'34px', width:"34px"}}/>,url: "/dispatcher/summary_applies"},
    {text: "Подрядчики",icon:<img src={contractors} alt="Подрядчики"  style={{height:'34px', width:"36px"}}/>,url: "/dispatcher/contractors"},
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