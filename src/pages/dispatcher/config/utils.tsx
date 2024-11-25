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
export const formatData = (isoDate: string | undefined) => {
    if (!isoDate) {
        return 'Нет данных'; 
    }
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0'); // ДД
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ММ (месяцы начинаются с 0)
    const year = date.getFullYear(); // ГГГГ
    const hours = String(date.getHours()).padStart(2, '0'); // ЧЧ
    const minutes = String(date.getMinutes()).padStart(2, '0'); // ММ
    const seconds = String(date.getSeconds()).padStart(2, '0'); // СС

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};