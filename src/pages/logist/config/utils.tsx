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
    {text: "Закреплённая техника",icon:<img src={markedTechnic} alt="Закреплённая техника"  style={{height:'34px', width:"36px"}}/>,url: "/markedtechnic"},
    {text: "Заявки",icon:<img src={list} alt="Заявки"  style={{height:'36px', width:"34px"}}/>,url: "/applies"},
    {text: "Сводные заявки", icon:<img src={freeApplies} alt="вободные заявки"  style={{height:'34px', width:"34px"}}/>,url: "/summary_applies"},
    {text: "Справочная информация",icon:<img src={question} alt="Справочная информация"  style={{height:'34px', width:"34px"}}/> , url: '/helpinfo'}
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
       console.log('Convert error')
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

    return timeString
}

export function parseISODuration(duration: string): string {
    // Регулярное выражение для разбора строки
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const match = duration.match(regex);

    if (!match) {
        throw new Error("Invalid duration format");
    }

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    // Форматирование в строку HH:MM:SS
    const formattedTime = 
        String(hours).padStart(2, '0') + ":" + 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');

    return formattedTime;
}
export function timeToISO(time:string) {
    const [hours, minutes] = time.split(':').map(Number);
  
    // Проверка на корректность значений
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error("Некорректное значение времени. Убедитесь, что часы находятся в диапазоне 0-23, а минуты — в диапазоне 0-59.");
    }
  
    // Получаем текущую дату
    const now = new Date();
  
    // Устанавливаем часы и минуты
    now.setHours(hours-17);
    now.setMinutes(minutes);
    now.setSeconds(0); // Устанавливаем секунды в 0
    now.setMilliseconds(0); // Устанавливаем миллисекунды в 0
  
    // Преобразуем дату в строку ISO 8601
    return now.toISOString();
  }
  
  // Пример использования:
  try {
    const time = "8:30"; // Вводимое время
    const isoFormat = timeToISO(time);
    console.log(isoFormat); // Вывод: 2023-10-03T08:30:00.000Z (пример)
  } catch (error) {
  }
  

