import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useEffect, useRef, useState } from "react"
import { buttons } from "../../config/utils"
import './summary_apply.css'
import { url } from "../../../../config"
import { unitType} from "../../../logist/markedTechnic/markedOne/MarkedOne"
import redact from "../../../../images/redact.png"
import ApplyToDraw from "../../../logist/summary_applies/summary_apply/ApplyToDraw"



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

interface RequestedEquipment {
    id: number;
    arrivalTime: number[];
    equipment: Equipment;
    equipmentType: EquipmentType;
    licensePlateNumber: string | null;
    workDuration: number;
}

interface Creator {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface Workplace {
    id: number;
    state: any;
    address: string;
    latitude: number;
    longitude: number;
}
interface Request {
    id: number;
    state: string;
    unit: unitType;
    workplace: Workplace;
    creator: Creator;
    requestedEquipment: RequestedEquipment[];
}

interface SummaryApply {
    id: number;
    name: string;
    image: string;
    manager: {
        id: number;
        username: string;
        role: string;
        email: string;
        unit: unitType;
    };
    unit: unitType;
    equipmentTypeResponses: EquipmentType[];
    date: string;
    distance: number;
    arrivalDate: number[];
    requests: Request[];
}

interface ApplyProps {
    number: string;
    state: string;
}
interface TechnicProps {
    id: number,
    mark: string,
    number: string,
    state: number,
    cost: number
}

const DisSummary_Apply:React.FC<ApplyProps> = ({number, state}) => {
    const [summaryapply, setSummaryapply] = useState<SummaryApply | null>(null)
    const [isPending, setIsPending] =useState<boolean>(false);
    const [showTechnic, setShowTechnic] = useState<boolean>(false);
    const [showTechnic2, setShowTechnic2] = useState<boolean>(false);
    const [optimalTechnic, setOptimalTechnic] = useState<TechnicProps[]>([])
    const [contractorsTechnic, setContractorsTechnic] = useState<TechnicProps[]>([])
    
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
                const responseData: SummaryApply = await response.json();
                console.log(responseData)
                setSummaryapply(responseData);
                setIsPending(false);
    
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        fetchData();
    }, [])
    const closeTechnicWindow = () => {
        setShowTechnic(false);
    }
    const closeTechnicWindow2 = () => {
        setShowTechnic(false);
    }

    const handleRedact = async (e: React.MouseEvent<HTMLElement>) => {
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
                const responseData: TechnicProps[] = await response.json();
                console.log("Response data:", responseData);
                setOptimalTechnic(responseData);
                setShowTechnic(true);
    
            } catch(error) {
                console.log("Fetch error:", error);
            }

            const requestOptionTwo: RequestInit  = {
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`,
                    
                }
            }

            try {
                const response = await fetch(`${url}/equipment/types`, requestOptionTwo)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: TechnicProps[] = await response.json();
                console.log("Response data:", responseData);
                setContractorsTechnic(responseData);
                setIsPending(false);
    
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
    }

    const sendToBase = async () => {
        if (!summaryapply) return; // Проверяем, есть ли данные для отправки
    
        const dataToSend = {
            id: summaryapply.id,
            state: summaryapply.requests[0]?.state || null, // Предполагаем, что состояние берется из первого запроса
            unit: summaryapply.unit,
            workplace: summaryapply.requests[0]?.workplace, // Предполагаем, что workplace берется из первого запроса
            creator: summaryapply.requests[0]?.creator, // Предполагаем, что creator берется из первого запроса
            requestedEquipment: summaryapply.requests.flatMap(request => 
                request.requestedEquipment.map(equipment => ({
                    id: equipment.id,
                    arrivalTime: equipment.arrivalTime,
                    equipment: {
                        id: equipment.equipment.id,
                        name: equipment.equipment.name,
                        image: equipment.equipment.image,
                    },
                    equipmentType: {
                        id: equipment.equipmentType.id,
                        type: equipment.equipmentType.type,
                        equipment: equipment.equipmentType.equipment,
                    },
                    licensePlateNumber: equipment.licensePlateNumber,
                    workDuration: equipment.workDuration,
                }))
            ),
        };
    
        const token = document.cookie.split("=")[1];
        const requestOption: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend), 
        };
    
        try {
            const response = await fetch(`${url}/requests/${number}/add_to_summary`, requestOption);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            console.log("Данные успешно отправлены");
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };
    
    return(
        <div
        className="summoryapply">
            <Header onDataChange={null}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="info">
                <label className="label">
                    Cводная заявка №{number}
                </label>
                <label className="ButtonLabel">
                    {state === "NEW" && "Открытая"}
                    {state === "CLOSED" && "В работе"}
                    {state === "ARCHIVED" && "В архиве"}

                </label>
                {(state === "NEW" || state === "CLOSED") && <img className="redact" src={redact} onClick={handleRedact}/>}
            </div>
            <div className="boxnotWhite">
            {summaryapply && summaryapply.requests.map(request => (
                <ApplyToDraw 
                    key={request.id} 
                    id={summaryapply.id} 
                    state={request.state} 
                    workerName={request.creator.username}
                    unitAddress={summaryapply.unit.address}
                    workplaceAddress={request.workplace.address} 
                    distance={summaryapply.distance} 
                    date={summaryapply.date} 
                    requestedEquipment={request.requestedEquipment} 
                />))
            }
            {state === "NEW" && <button className="sendLists"  onClick={sendToBase}>Отправить сводную заявку</button>}
            </div>
            {showTechnic && (
    <div>
        <div className="overlay" onClick={closeTechnicWindow}></div>
        <div className="windowallTechnicApply">
            <div className="flexWindowTop">
                <div className="label" >Оптимальные варианты техники</div>
            </div>
            <label className="label10">Техника на базе</label>
            <div className="UptableInWindow">
            {isPending ? (
                <div style={{ textAlign: "center", fontSize: "32px" }}>Загрузка...</div>
                ) : (
                <table className="tableInWindow">
                    <thead>
                        <tr>
                            <th className="left_th">Номер</th>
                            <th className="left_th">Марка</th>
                            <th className="left_th">Состояние машины</th>
                            <th className="left_th">Стоимость</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showTechnic ? (
                        optimalTechnic.map((technic) => (
                            <tr key={technic.id} data-id={technic.id}>
                                <td className="left_td">{technic.number}</td>
                                <td className="left_td">{technic.mark}</td>
                                <td className="left_td">{technic.state}%</td>
                                <td className="left_td last_t">
                                    <div className="status">{technic.cost}</div>
                                </td>
                            </tr>
                        ))
                    ) : ""}
                    </tbody>
            </table>
        )}

                    </div>
                    <label className="label10">Техника подрядчика</label>

            </div>
        </div>
        )}
        

        </div>
    )
}

export default DisSummary_Apply;