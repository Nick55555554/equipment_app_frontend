import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, {useEffect, useRef, useState } from "react"
import { buttons, formatData, formatDataDate, formatWorkTime } from "../../config/utils"
import './apply.css'
import musor from "../../../../images/mysor.svg"
import { url } from "../../../../config"
import Input from "../../../../components/UI/input"
import { v4 as uuidv4 } from 'uuid';

interface EquipmentTypeResponse {
    id: number;
    type: string;
}


interface technic{
    id: number;
    name: string;
    image: string;
    equipmentTypeResponses: EquipmentTypeResponse[];
}

interface applyProps{
    number: string;
}
interface getEquipmentType{
    "id": number,
    "equipmentId": number;
    "equipmentName": string;
    "equipmentImage": string
    "equipmentTypeId": number;
    "equipmentType": string;
    "licensePlateNumber": string | null;
    "arrivalTime": string;
    "workDuration": string;
    "selfId"?: string;
}

export interface getApplyType{
    "id": number;
    "state": string | null;
    "workerName": string;
    "unitAddress": string;
    "workplaceAddress": string;
    "distance": string;
    "date": string;
    "progress": number;
    "total": number;
    "equipment": getEquipmentType[];
}
const Apply:React.FC<applyProps> = ({number}) => {
    const button = useRef<HTMLButtonElement | null>(null);
    const [technic, setTechnic] = useState<technic[]>()
    const [isPending, setIsPending] =useState<boolean>(false);
    const [showTechnic, setShowTechnic] = useState<boolean>(false);;
    const settingsApplies = useRef<HTMLDivElement | null>(null);
    const [selectedTechnics,setSelectedTechnics] = useState<getEquipmentType[] | null>([])
    const [kolvo, setKolvo] = useState<Record<number, number>>({});
    const updateKolvo = (id: number, delta: number) => {
        setKolvo(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) + delta, 0) 
        }));
    };

    const [info, setInfo] = useState<getApplyType | null>(null);
    const [typeClickers, setTypeClickers] = useState<Record<number, boolean>>({});

    const handleClicker = async (e: React.MouseEvent<HTMLElement>) =>  {
        setIsPending(true);
        const token = document.cookie.split('=')[1]
        const requestOption: RequestInit  = {
            method: "GET",
            headers: {
                "Content-type": 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": `Bearer ${token}`,
                
            }
        }
        try {
            const response = await fetch(`${url}/equipment/types`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: technic[] = await response.json();
            console.log("Response data:", responseData);
            setTechnic(responseData);
            setIsPending(false);
            setShowTechnic(true);

        } catch(error) {
            console.log("Fetch error:", error);
            setIsPending(false)
        }
}
    const closeTechnicWindow = () => {
        setShowTechnic(false);
    }

    const convertToGetEquipmentType = (technic: technic): getEquipmentType => {
        return {
            id: technic.id,
            equipmentId: technic.id, 
            equipmentName: technic.name,
            equipmentImage: technic.image,
            equipmentTypeId: 0,
            equipmentType: "",
            licensePlateNumber: null,
            arrivalTime: "2023-12-03T09:00:00Z",
            workDuration: "1:00",
            selfId: uuidv4(),
        };
    };
    
    const addTechnic = (technicToAdd: technic) => {
        const equipmentType = convertToGetEquipmentType(technicToAdd);
        setSelectedTechnics(prev => [...(prev || []), equipmentType]);
        setShowTechnic(false);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            const token = document.cookie.split("=")[1];
            const requestOption: RequestInit = {
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`
                }
            };
            try {
                const response = await fetch(`${url}/requests/${number}`, requestOption);
                console.log(`${url}/requests`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: getApplyType = await response.json(); 
                console.log("Response data:", responseData);
                setInfo(responseData); 
                setIsPending(false);
            } catch (error) {
                console.log("Fetch error:", error);
                setIsPending(false);
            }
        };
    
        fetchData();
    }, [number]); 


    useEffect(() => {
        if (info) {
            const updatedEquipment = info.equipment.map((prev) => ({
                ...prev,
                selfId: uuidv4() 
            }));
            setSelectedTechnics(updatedEquipment);
        }
    }, [info])
    function formatWorkTim(workDuration: string): React.ReactNode {
        throw new Error("Function not implemented.")
    }

    return(
        <div
        className="apply">
            <Header onDataChange={selectedTechnics} urlToBD="/equipment/types"/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="info">
                <label className="label">
                    Заявка №{number}
                </label>
            </div>
                
            <div className="box">
                <div className="heighWeight">ФИО мастера:<span className="lowWeight">{info?.workerName}</span></div>
                <div className="heighWeight">Адрес объекта:<span className="lowWeight">{info?.workplaceAddress}</span></div>
                <div className="heighWeight">Расстояние до объекта:<span className="lowWeight">{info?.distance} км</span></div>
                <div className="heighWeight">Дата подачи на объект:<span className="lowWeight">{formatDataDate(info?.date)}</span></div>
                <div className="heighWeight">Техника <button ref={button} onClick={handleClicker}
                className="button_apply">{isPending ? 'Загрузка...' : 'Добавить технику'}</button></div>
                <div className="settings_applies" ref={settingsApplies}>
                    
                    {selectedTechnics?.map((one) => (
                        
                        <div className="setting_apply" key={uuidv4()} >
                            <div className="row1">
                                <div className="technic_name">{one.equipmentName}</div>

                                <div className={`V type${one.id}`} onClick={() => {
                                    setTypeClickers(prev => {
                                        const newState = { ...prev, [one.id]: !prev[one.id] };
                                        return newState;
                                    });
                                }}>
                                    {one.equipmentType}
                                </div>




                                <div className="technic_number">------</div>
                                <div className="gnoiy">
                                    <img src={musor} style={{width:'32px', height:"32px", cursor:"pointer"}} onClick={() =>{
                                    setSelectedTechnics(prev => prev ? prev.filter(technic => technic.selfId !== one.selfId) : [])}}/>
                                </div>
                            </div>
                            <div className="row2">
                                <div className="technic_image"><img src={one.equipmentImage} style={{width:'100%', aspectRatio:"17/10",objectFit: "contain"}}/></div>
                                <div className="big">
                                    Количество
                                    <form  className="kol-vo">
                                        <div className="minus" onClick={() => updateKolvo(one.id, -1)}>-</div>
                                        {kolvo[one.id] || 0} 
                                        <div className="plus" onClick={() => updateKolvo(one.id, 1)}>+</div>
                                    </form>
                                </div>
                                <div className="big"> Время подачи
                                    <div className="time_send">{formatData(one.arrivalTime)}</div>
                                </div>
                                <div className="big"> Время работы
                                    <div className="time_work">{(one?.workDuration)}</div>
                                </div>
                            </div>

                            {/* {typeClickers[one.id] ? (
                            <ul className={`typeWindow${one.id} ulWindow`}>
                                {one.equipmentTypeResponses.map((type) => (
                                    <li key={type.id} className="widnowLi" 
                                        onClick={(e) => {
                                            const targets = document.getElementsByClassName(`type${one.id}`) as HTMLCollectionOf<HTMLElement>;
                                            if (targets.length > 0) { 
                                                const newType = e.target as HTMLElement
                                                targets[0].textContent = newType.textContent  || ""; 
                                            }
                                            setTypeClickers(prev => ({
                                                ...prev,
                                                [one.id]: false
                                            }));
                                        }}>
                                        {type.type}
                                    </li>
                                ))}
    </ul>
) : ""} */}

                        </div>
                        ))}
                </div>
                <button className="button_apply_send"> Отправить</button>
            </div>
            

        {(showTechnic) &&    
            <>
                <div className="overlay" onClick={closeTechnicWindow}></div>
                <div className="windowallTechnic">
                <div className="bigInpit">Техника
                <Input width={100} urlToBD="/equipment/types" onDataChange={setTechnic}/>
                </div>
                <div className="allTechnic">
                {technic && technic.map((one) => (
                    <div className="one" key={uuidv4()}>
                        <img src={one.image} alt={one.name} style={{width:'100%', aspectRatio:"17/10", objectFit: "contain"}} />
                        <label className="labelunder">{one.name}</label>
                        <button className="addTechnic" onClick={() => addTechnic(one)}>Добавить</button>
                    </div>
                ))}
                </div>
            </div>
        </>
        }
    </div>
)
}

export default Apply;