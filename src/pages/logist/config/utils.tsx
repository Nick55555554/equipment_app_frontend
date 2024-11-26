import object from "../../../images/object.png"
import technic from "../../../images/technic.png"
import workerImage from "../../../images/worker.png"
import list from "../../../images/List.png"
import freeApplies from "../../../images/FreeApplies.png"
import question from "../../../images/Question.png"
import markedTechnic from '../../../images/markedTechnic.png'
import { time } from "console"
export const buttons = 
[
    {text: "Мастера бригад",
    icon: <img src={workerImage} alt="Мастера бригад" style={{height:'34px', width:"34px"}}/>,url: "/"},
    {text: "Объекты",icon:<img src={object} alt="Объекты"  style={{height:'34px', width:"34px"}}/>,url: "/objects"},
    {text: "Список техники",icon:<img src={technic} alt="Техника"  style={{height:'34px', width:"36px"}}/>,url: "/technic"},
    {text: "Закреплённая техника",icon:<img src={markedTechnic} alt="акреплённая техника"  style={{height:'34px', width:"36px"}}/>,url: "/markedtechnic"},
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
export const formatDataDate = (isoDate: string | undefined) => {
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

    return `${day}.${month}.${year
    }`;
};
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

    return `${hours}:${minutes}`;
};
export const formatWorkTime = (isoDate: string | undefined) => {
    if (!isoDate) {
        return 'Нет данных'; 
    }
    const formated = isoDate.split('PT')[1].split("H")[0] + ":" + isoDate.split('PT')[1].split("H")[1].split('H')[0].split('M')[0]

    return `${formated}`;
};
export const convertArrivalTime = (arrivalTime: number[]):string =>{
    if (arrivalTime.length !== 7) {
        throw new Error("Invalid arrivalTime array. It must contain exactly 7 elements.");
    }


    const milliseconds = arrivalTime[6]; // миллисекунды
    const date = new Date(
        arrivalTime[0], // год
        arrivalTime[1] - 1, // месяц (0-11)
        arrivalTime[2], // день
        arrivalTime[3], // час
        arrivalTime[4], // минуты
        arrivalTime[5], // секунды
        Math.floor(milliseconds) // секунды из миллисекунд
    );

    const dateString = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    const timeString = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    console.log(timeString)
    return timeString
}
