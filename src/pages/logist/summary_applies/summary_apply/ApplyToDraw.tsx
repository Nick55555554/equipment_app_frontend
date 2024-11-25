import React, { useEffect, useRef, useState } from "react";
import musor from "../../../../images/mysor.svg";
import Input from "../../../../components/UI/input";
import { v4 as uuidv4 } from 'uuid';
import { url } from "../../../../config";

interface EquipmentTypeResponse {
    id: number;
    type: string;
}

interface Technic {
    id: number;
    name: string;
    image: string;
    equipmentTypeResponses: EquipmentTypeResponse[];
}

interface GetEquipmentType {
    id: number;
    equipmentId: number;
    equipmentName: string;
    equipmentImage: string;
    equipmentTypeId: number;
    equipmentType: string;
    licensePlateNumber: string | null;
    arrivalTime: string;
    workDuration: string;
    selfId?: string;
}

interface EquipmentType{
    id: number;
    name: string;
    image: string;
}

interface EquipmentTypeResponsesTypes {
    id: number;
    type: string;
    equipment: EquipmentType;
}

interface GetApplyType {
    id: number;
    state?: string | null;
    workerName?: string;
    unitAddress?: string;
    workplaceAddress?: string;
    distance?: number;
    date?: string;
    progress?: number;
    total?: number;
    equipmentType?: EquipmentTypeResponsesTypes;
}

const ApplyToDraw: React.FC<GetApplyType> = ({
    id,
    state,
    workerName,
    unitAddress,
    workplaceAddress,
    distance,
    date,
    progress,
    total,
    equipmentType
}) => {
    const button = useRef<HTMLButtonElement | null>(null);
    const [technic, setTechnic] = useState<Technic[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [showTechnic, setShowTechnic] = useState<boolean>(false);
    const settingsApplies = useRef<HTMLDivElement | null>(null);
    const [selectedTechnics, setSelectedTechnics] = useState<GetEquipmentType[]>([]);
    const [kolvo, setKolvo] = useState<number>(1);
    const [typeClickers, setTypeClickers] = useState<Record<number, boolean>>({});

    const closeTechnicWindow = () => {
        setShowTechnic(false);
    };

    const handleClicker = async (e: React.MouseEvent<HTMLElement>) => {
        setIsPending(true);
        const token = document.cookie.split('=')[1];
        const requestOption: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": `Bearer ${token}`,
            }
        };
        try {
            const response = await fetch(`${url}/equipment/types`, requestOption);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: Technic[] = await response.json();
            console.log("Response data:", responseData);
            setTechnic(responseData);
            setIsPending(false);
            setShowTechnic(true);
        } catch (error) {
            console.log("Fetch error:", error);
            setIsPending(false);
        }
    };

    const convertToGetEquipmentType = (technic: Technic): GetEquipmentType => {
        return {
            id: technic.id,
            equipmentId: technic.id,
            equipmentName: technic.name,
            equipmentImage: technic.image,
            equipmentTypeId: 0,
            equipmentType: "",
            licensePlateNumber: null,
            arrivalTime: "9:00",
            workDuration: "1:00",
            selfId: uuidv4(),
        };
    };

    const addTechnic = (technicToAdd: Technic) => {
        const equipmentType = convertToGetEquipmentType(technicToAdd);
        setSelectedTechnics(prev => [...prev, equipmentType]);
        setShowTechnic(false);
    };

    useEffect(() => {
        if (equipmentType) {
            // Если equipmentType - это объект, то можно добавить его в selectedTechnics
            // setSelectedTechnics(prev => [...prev, convertToGetEquipmentType(equipmentType)]);
        }
    }, [equipmentType]);

    return (
        <div className="applyToDraw">
            <div className="box">
                <div className="heighWeight">ФИО мастера:<span className="lowWeight">{workerName}</span></div>
                <div className="heighWeight">Адрес объекта:<span className="lowWeight">{workplaceAddress}</span></div>
                <div className="heighWeight">Расстояние до объекта:<span className="lowWeight">{distance}</span></div>
                <div className="heighWeight">Дата подачи на объект:<span className="lowWeight">{date}</span></div>
                <div className="heighWeight">Техника 
                    <button ref={button} onClick={handleClicker} className="button_apply">
                        {isPending ? 'Загрузка...' : 'Добавить технику'}
                    </button>
                </div>
                <div className="settings_applies" ref={settingsApplies}>
                    {selectedTechnics.map((one) => (
                        <div className="setting_apply" key={one.selfId}>
                            <div className="row1">
                                <div className="technic_name">{one.equipmentName}</div>
                                <div className={`V type${one.id}`} onClick={() => {
                                    setTypeClickers(prev => ({
                                        ...prev,
                                        [one.id]: !prev[one.id]
                                    }));
                                }}>
                                    {one.equipmentType}
                                </div>
                                <div className="technic_number">------</div>
                                <div className="gnoiy">
                                    <img src={musor} style={{ width: '32px', height: "32px", cursor: "pointer" }} onClick={() => {
                                        setSelectedTechnics(prev => prev.filter(technic => technic.selfId !== one.selfId));
                                    }} />
                                </div>
                            </div>
                            <div className="row2">
                                <div className="technic_image">
                                    <img src={one.equipmentImage} style={{ width: '100%', aspectRatio: "17/10", objectFit: "contain" }} />
                                </div>
                                <div className="big">
                                    Количество
                                    <form className="kol-vo">
                                        <div className="minus" onClick={() => {
                                            if (kolvo >= 1) {
                                                setKolvo(kolvo - 1);
                                            }
                                        }}>-</div>
                                        {kolvo}
                                        <div className="plus" onClick={() => {
                                            setKolvo(kolvo + 1);
                                        }}>+</div>
                                    </form>
                                </div>
                                <div className="big"> Время подачи
                                    <div className="time_send">{one.arrivalTime}</div>
                                </div>
                                <div className="big"> Время работы
                                    <div className="time_work">{one.workDuration}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="button_apply_send">Отправить</button>
            </div>

            {showTechnic && (
                <>
                    <div className="overlay" onClick={closeTechnicWindow}></div>
                    <div className="windowallTechnic">
                        <div className="bigInpit">Техника
                            <Input width={100} urlToBD="/equipment/types" onDataChange={setTechnic} />
                        </div>
                        <div className="allTechnic">
                            {technic.map((one) => (
                                <div className="one" key={uuidv4()}>
                                    <img src={one.image} alt={one.name} style={{ width: '100%', aspectRatio: "17/10", objectFit: "contain" }} />
                                    <label className="labelunder">{one.name}</label>
                                    <button className="addTechnic" onClick={() => addTechnic(one)}>Добавить</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ApplyToDraw;