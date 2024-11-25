import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useRef, useState } from "react"
import { buttons } from "../../config/utils"
import './summary_apply.css'
import musor from "../../../../images/mysor.svg"
import { url } from "../../../../config"
import Input from "../../../../components/UI/input"

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
const Summary_Apply:React.FC<applyProps> = ({number}) => {
    const button = useRef<HTMLButtonElement | null>(null);
    const [technic, setTechnic] = useState<technic[]>()
    const [isPending, setIsPending] =useState<boolean>(false);
    const [showTechnic, setShowTechnic] = useState<boolean>(false);;
    const settingsApplies = useRef<HTMLDivElement | null>(null);
    const [selectedTechnics,setSelectedTechnics] = useState<technic[]>([])
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
            const response = await fetch(`${url}/equipment/types`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: technic[] = await response.json();
            console.log("Response data:", responseData);
            const transformedData = responseData.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                equipmentTypeResponses: item.equipmentTypeResponses,
            }));
            setTechnic(transformedData);
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
                <div className="heighWeight">ФИО мастера:<span className="lowWeight">папа</span></div>
                <div className="heighWeight">Адрес объекта:<span className="lowWeight">папа</span></div>
                <div className="heighWeight">Расстояние до объекта:<span className="lowWeight">папа</span></div>
                <div className="heighWeight">Дата подачи на объект:<span className="lowWeight">папа</span></div>
                <div className="heighWeight">Техника <button ref={button} onClick={handleClicker}
                className="button_apply">{isPending ? 'Загрузка...' : 'Добавить технику'}</button></div>
                <div className="settings_applies" ref={settingsApplies}>
                    
                    {selectedTechnics?.map((one) => (
                        
                        <div className="setting_apply" key={one.id} >
                            <div className="row1">
                                <div className="technic_name">{one.name}</div>



                                <div className={`V type${one.id}`} onClick={() => {
                                    setTypeClickers(prev => {
                                        const newState = { ...prev, [one.id]: !prev[one.id] };
                                        return newState;
                                    });
                                }}>
                                    {one.equipmentTypeResponses?.[0]?.type}
                                </div>




                                <div className="technic_number">------</div>
                                <div className="gnoiy">
                                    <img src={musor} style={{width:'32px', height:"32px", cursor:"pointer"}} onClick={() =>{
                                    setSelectedTechnics(prev => prev.filter(technic => technic.id !== one.id))}}/>
                                </div>
                            </div>
                            <div className="row2">
                                <div className="technic_image"><img src={one.image} style={{width:'100%', aspectRatio:"17/10",objectFit: "contain"}}/></div>
                                <div className="big">
                                    Количество
                                    <form  className="kol-vo">
                                        <div className="minus" onClick={()=>{
                                            if(kolvo>=1)
                                                {setKolvo(kolvo-1)} 
                                        }}>-</div>
                                        {kolvo}
                                        <div className="plus" onClick={()=>{
                                            setKolvo(kolvo+1)
                                        }}>+</div>
                                    </form>
                                </div>
                                <div className="big"> Время подачи
                                    <div className="time_send">9:00</div>
                                </div>
                                <div className="big"> Время работы
                                    <div className="time_work">1:30</div>
                                </div>
                            </div>

                            {typeClickers[one.id] ? (
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
) : ""}

                        </div>
                        ))}
                </div>
                <button className="button_apply_send"> Отправить</button>
            </div>
            

        {showTechnic &&    
            <>
                <div className="overlay" onClick={closeTechnicWindow}></div>
                <div className="windowallTechnic">
                <div className="bigInpit">Техника
                <Input width={100} urlToBD="/equipment/types" onDataChange={setTechnic}/>
                </div>
                <div className="allTechnic">
                    {technic && technic.map((one) => (
                        <div className="one" key={one.id}>
                            <img src={one.image} alt={one.name}style={{width:'100%', aspectRatio:"17/10",objectFit: "contain"}} />
                            <label className="labelunder">{one.name}</label>
                            <button className="addTechnic"
                            onClick={(e) => {
                                setSelectedTechnics(prev => [...prev, one]);
                                setShowTechnic(false);
                            }}
                            >Добавить</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
        }
    </div>
)
}

export default Summary_Apply;