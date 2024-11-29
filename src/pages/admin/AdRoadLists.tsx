import { useEffect, useState } from "react";
import Header from "../../components/Ordinary/header";
import LeftPanel from "../../components/Ordinary/leftPanel";
import { buttons } from "./home/AdminHome";
import { useLocation, useNavigate } from "react-router-dom";
import excel from "../../images/excel.png"
import { url } from "../../config";
import { formatDataDate } from "../logist/config/utils";


export interface equipmentType{
    id: number;
    name: string;
    image: string;
}

export interface equipmentTypeResponsesTypes{
    id: number;
    type: string;
    equipment: equipmentType;
}

interface unitType{
    id:number;
    address: string;
    latitude: number;
    longitude: number;
}

interface baseType{
    id: number;
    unit: unitType
    address: string;
    latitude: number;
    longitude: number;
}

export interface markedTechnicTypes{
    id: number;
    licensePlate:string;
    carBrand: string;
    base: baseType;
    equipmentType: equipmentTypeResponsesTypes;
}
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

export const AdRoadLists = () => {


    const [technics, setTechnics] = useState<YourDataType[]>([]);
    const [allTechnics, setAllTechnics] = useState<YourDataType[]>([]);
    const [technic, setTechnic] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(null);
    const [cookie, setCookie] = useState<string | null>(document.cookie);


    useEffect(() => {
        if(!cookie) {
            navigate('/auth')
        }
    }, [cookie])

    useEffect(() => {
        setIsPending(true)
        const myfetch = async () => {
            const token = document.cookie.split('=')[1]
            const requestOption: RequestInit  = {
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`
                    
                }
            }
            try {
                const response = await fetch(`${url}/track`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: YourDataType[] = await response.json();
                console.log("Response data:", responseData);
                setTechnics(responseData);
                setIsPending(false);
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        myfetch();
    },[])
    
    const toExcepClick = () => {

    }


    const getTechnics = ({technics}: {technics: YourDataType[]}) => {
        return (
            <tbody>

                {technics.map((technic) => (
                    <tr key={technic.id} data-id={technic.id} data-active={technic.isActive} onClick={toExcepClick}>
                        <td className="left_td"  onClick={(e) => {
                            e.stopPropagation(); 
                        }}>
                            {technic.namedEquipment.licensePlate}
                        </td>
                        <td className="left_td">
                            {technic.namedEquipment.licensePlate}
                        </td>
                        <td className="left_td">
                        {technic.driver}
                        </td>
                        <td className="left_td last_t">
                        <div className="status">{formatDataDate(technic.date)}</div><img className="leftVector" src={excel} alt="Подробнее" style={{marginLeft:"150px"}}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    return(
        <div className="roadLists">
            <Header  onDataChange={null}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="infotechnic">
                <label className="label">
                    Путевые листы
                </label>
                </div>
            <div className="table-container-technic">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left_th">Номер </th>
                            <th className="left_th">Гос. номер </th>
                            <th className="left_th" >ФИО водителя</th>
                            <th className="left_th" >Дата</th>
                        </tr>
                    </thead>
                        {!isPending ? getTechnics({ technics }) : (<tbody>
                        <td></td>
                        <td style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px"}}>Загрузка...</td>
                    
                    </tbody> )}
                </table>
            </div>

        </div>
    )
}