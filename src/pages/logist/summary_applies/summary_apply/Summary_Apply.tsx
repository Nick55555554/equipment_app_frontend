import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useEffect, useRef, useState } from "react"
import { buttons } from "../../config/utils"
import './summary_apply.css'
import musor from "../../../../images/mysor.svg"
import { url } from "../../../../config"
import Input from "../../../../components/UI/input"
import { unitType } from "../../markedTechnic/markedOne/MarkedOne"
import { markedTechnicTypes } from "../../markedTechnic/MarkedTechnic"
import ApplyToDraw from "./ApplyToDraw"

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
    arrivalTime: number[]; // Массив с датой и временем
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
}

const Summary_Apply:React.FC<ApplyProps> = ({number}) => {
    const button = useRef<HTMLButtonElement | null>(null);
    const [summaryapply, setSummaryapply] = useState<SummaryApply | null>(null)
    const [isPending, setIsPending] =useState<boolean>(false);
    const [showTechnic, setShowTechnic] = useState<boolean>(false);;
    const settingsApplies = useRef<HTMLDivElement | null>(null);
    const [selectedTechnics,setSelectedTechnics] = useState<SummaryApply[]>([])
    const [kolvo, setKolvo] = useState<number>(1);

    
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
                setShowTechnic(true);
    
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        fetchData();
    }, [])

    return(
        <div
        className="summoryapply">
            <Header onDataChange={selectedTechnics} urlToBD="/equipment/types"/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="info">
                <label className="label">
                    Заявка №{number}
                </label>
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
                />
                
                    ))
            }
            </div>
        </div>
    )
}

export default Summary_Apply;