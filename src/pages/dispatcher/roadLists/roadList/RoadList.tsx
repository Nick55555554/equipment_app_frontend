import { useEffect, useState } from "react";
import Header from "../../../../components/Ordinary/header";
import LeftPanel from "../../../../components/Ordinary/leftPanel";
import { buttons } from "../../config/utils";
import { formatDataDate } from "../../../logist/config/utils";
import "./roadlist.css"
import { url } from "../../../../config";


interface Unit {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
}

interface Base {
    id: number;
    unit: Unit;
    address: string;
    latitude: number;
    longitude: number;
}

interface Equipment {
    id: number;
    name: string;
    image: string;
}

interface EquipmentType {
    id: number;
    type: string;
    equipment: Equipment;
}

interface NamedEquipment {
    id: number;
    licensePlate: string;
    carBrand: string;
    base: Base;
    fuelType: string;
    equipmentType: EquipmentType;
}

interface ArrivalPoint {
    id: number;
    address: string;
    planOutTime: string; // ISO 8601 date string
    planArrivalTime: string; // ISO 8601 date string
    distanse: number; // исправлено с "distanse" на "distance"
    planWorkDuration: number; // в секундах
}

interface YourDataType {
    id: number;
    date: string; // ISO 8601 date string
    namedEquipment: NamedEquipment;
    driver: null | string; // предполагается, что driver может быть строкой или null
    isActive: boolean;
    arrivalPoints: ArrivalPoint[];
}

const RoadList = ({number}: {number: string}) => {
    const [list, setList] = useState<YourDataType | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    useEffect(() => {
        setIsPending(true);
        const token = document.cookie.split('=')[1]
        const fetchData = async () => {
            const requestOption: RequestInit  = {   
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`,
                    
                }
            }
            try {
                const response = await fetch(`${url}/summary/${number}`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: YourDataType = await response.json();
                console.log(responseData)
                setList(responseData);
                setIsPending(false);
    
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        fetchData();
    }, [])

    return (
        <div
        className="roadList">
        <Header  onDataChange={() => {}}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoRoadList">
                <label className="label"> Путевой лист №{number}</label>
                <div 
                    className="bigAnalytishForRoadList">
                    </div>
                    <div 
                    className="bigAnalytishForRoadList">
                        <div className="heighWeightLIST">Дата:<span className="lowWeight">{formatDataDate(list?.date)}</span></div>
                        <div className="heighWeightLIST">Вид:<span className="lowWeight">{list?.namedEquipment.equipmentType.equipment.name}</span></div>
                        <div className="heighWeightLIST">Тип:<span className="lowWeight">{list?.namedEquipment.equipmentType.type}</span></div>
                        <div className="heighWeightLIST">Марка машины:<span className="lowWeight">{list?.namedEquipment.carBrand}</span></div>
                        <div className="heighWeightLIST">Марка горючего:<span className="lowWeight">{list?.namedEquipment.fuelType}</span></div>
                        <div className="heighWeightLIST">Номер:<span className="lowWeight">{list?.namedEquipment.licensePlate}</span></div>
                        <div className="heighWeightLIST">ФИО водителя:<span className="lowWeight">{list?.driver}</span></div>
                        <div className="heighWeightLIST">Стоимость часа работ:<span className="lowWeight">1000 руб</span></div>
                    </div>

                    
                    <label className="label">Маршрут</label>

                
                <div className="veryBigAnalytishForRoadList">
                        <div className="heighWeightLIST">Адрес объекта:<span className="lowWeight">{list?.namedEquipment.base.address}</span></div>
                        <div className="heighWeightLIST">Расстояние:<span className="lowWeight">{list?.arrivalPoints[0].distanse}</span></div>
                        <label className="heighWeightLIST">Плановые данные</label>
                        <div className="dannie">
                                <div className="bukvi">Время выезда</div>
                                <div className="bukvi">Время прибытия</div>
                                <div className="bukvi">Время работы</div>
                            </div>
                        <div className="dannieButton">
                            <div className="notInputList">{list?.arrivalPoints[0].planArrivalTime}</div>
                            <div className="notInputList">10:00</div>
                            <div className="notInputList">34</div>
                        </div> 
                        <label className="heighWeightLIST">Фактические данные</label> 
                        <div className="dannieTwo">
                                <div className="bukviTwo">Время выезда</div>
                                <div className="bukviTwo">Время прибытия</div>
                            </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo"></input>
                            <input className="inputListonlyTwo"></input>
                        </div> 
                        <div className="dannieTwo">
                                <div className="bukviTwo">Время работы</div>
                                <div className="bukviTwo">Время ожидания</div>
                            </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo"></input>
                            <input className="inputListonlyTwo"></input>
                        </div> 
                        <div className=" out">Показания одометра</div>
                        <div className="dannieTwo">
                                <div className="bukviTwo">При выезде</div>
                                <div className="bukviTwo">По возвращении</div>
                            </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo"></input>
                            <input className="inputListonlyTwo"></input>
                        </div> 
                        <div className=" out">Остаток топлива</div>
                        <div className="dannieTwo">
                            <div className="bukviTwo">При выезде</div>
                            <div className="bukviTwo">По возвращении</div>
                            </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo"></input>
                            <input className="inputListonlyTwo"></input>
                        </div> 
                    </div>
                <button className="sendLists">Закрыть путевой лист</button>
        </div>
    </div>
    )
}
export default RoadList;
