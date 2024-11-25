import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useRef, useState } from "react"
import { buttons } from "../../config/utils"
import './summary_apply.css'
import musor from "../../../../images/mysor.svg"
import { url } from "../../../../config"
import Input from "../../../../components/UI/input"
import { unitType } from "../../markedTechnic/markedOne/MarkedOne"
import { markedTechnicTypes } from "../../markedTechnic/MarkedTechnic"
import ApplyToDraw from "./ApplyToDraw"

interface equipmentType{
    id: number;
    name: string;
    image: string;
}

interface equipmentTypeResponsesTypes{
    id: number;
    type: string;
    equipment: equipmentType;
}
interface EquipmentTypeResponse {
    id: number;
    type: string;
}
interface managerType{
    id: number; 
    username: string;
    role: string;
    email: string;
    unit :unitType
}

interface workplaceType{
    id: number,
    state: any,
    address: string,
    latitude: number,
    longitude: number,
}
interface creatorType{
    username: string,
}
interface requestType{
    id: number,
    state: string,
    unit: unitType,
    workplace: workplaceType,
    creator: creatorType,
    equipmentType: equipmentTypeResponsesTypes
}

interface summaryApplyType{
    id: number;
    name: string;
    image: string;
    manager: managerType;
    unit: unitType,
    equipmentTypeResponses: EquipmentTypeResponse[],
    date: string,
    distance: number,
    arrivalDate: number[]
    requests: requestType[],
    requestedEquipment: markedTechnicTypes[]
}
interface applyProps{
    number: string
}

const Summary_Apply:React.FC<applyProps> = ({number}) => {
    const button = useRef<HTMLButtonElement | null>(null);
    const [summaryapply, setSummaryapply] = useState<summaryApplyType[]>()
    const [isPending, setIsPending] =useState<boolean>(false);
    const [showTechnic, setShowTechnic] = useState<boolean>(false);;
    const settingsApplies = useRef<HTMLDivElement | null>(null);
    const [selectedTechnics,setSelectedTechnics] = useState<summaryApplyType[]>([])
    const [kolvo, setKolvo] = useState<number>(1);

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
            const response = await fetch(`${url}/summory/${number}`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: summaryApplyType[] = await response.json();
            setSummaryapply(responseData);
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
            {summaryapply?.map(one => (
                one.requests.map(request => (
                    <ApplyToDraw 
                        key={request.id} 
                        id={one.id} 
                        state={request.state} 
                        workerName={request.creator.username}
                        unitAddress={one.unit.address}
                        workplaceAddress={request.workplace.address} 
                        distance={one.distance} 
                        date={one.date} 
                        equipmentType={request.equipmentType} 
                />
                    ))
                ))
            }
            </div>
        </div>
    )
}

export default Summary_Apply;