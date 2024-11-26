import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../config/utils";
import { useLocation, useNavigate } from "react-router-dom";
import leftVector from "../../../images/leftVector.png"
import { url } from "../../../config";
import './markedTechnic.css'
import { useMarkedTechnicRouter } from "../../../router/PageCreators/MarkedTechnicCreator"

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

const MarkedTechnic:React.FC  = () => {

    const [technics, setTechnics] = useState<markedTechnicTypes[]>([]);
    const [allTechnics, setAllTechnics] = useState<markedTechnicTypes[]>([]);
    const [technic, setTechnic] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const {createTechnicRoute} = useMarkedTechnicRouter();
    const [isPending, setIsPending] = useState<boolean>(false);

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
                const response = await fetch(`${url}/named_equipment`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: markedTechnicTypes[] = await response.json();
                console.log("Response data:", responseData);
                setTechnics(responseData);
                setAllTechnics(responseData);
                setIsPending(false);
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        myfetch();
    },[])
    
    const handleClickToMarkedTechnic = (e: React.MouseEvent<HTMLElement>): void => {
        const clickedElement = e.target as HTMLElement;
        const childTd = clickedElement.closest('tr');
        const technicId = childTd?.getAttribute('data-id');
        if (technicId) {
            setTechnic(technicId); 
        }
    };

    useEffect(() => {
        if (technic) {
            createTechnicRoute(technic);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/markedtechnic${technic}`);
        }

    }, [technic, navigate]);

    const getTechnics = ({technics}: {technics: markedTechnicTypes[]}) => {
        return (
            <tbody>

                {technics.map((technic) => (
                    <tr key={technic.id} data-id={technic.id} onClick={handleClickToMarkedTechnic}>
                        <td className="left_td"  onClick={(e) => {
                            e.stopPropagation(); 
                        }}>
                            {technic.licensePlate}
                        </td>
                        <td className="left_td">
                            {technic.carBrand}
                        </td>
                        <td className="left_td">
                        {technic.equipmentType ? technic.equipmentType.type : 'Неизвестно'}
                        </td>
                        <td className="left_td last_t">
                        <div className="status">{technic.carBrand}</div><img className="leftVector" src={leftVector} alt="Подробнее" />
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    return(
        <div
        className="technics">
            <Header urlToBD="/workplaces" onDataChange={setTechnics}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="infotechnic">
                <label className="label">
                    Техника
                </label>
                </div>
            <div className="table-container-technic">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left_th">Номер </th>
                            <th className="left_th">Вид техники </th>
                            <th className="left_th" >Тип техники</th>
                            <th className="left_th" >Марка</th>
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
export default MarkedTechnic;