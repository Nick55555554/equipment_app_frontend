import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../home/AdminHome";
import { useLocation, useNavigate } from "react-router-dom";
import leftVector from "../../../images/leftVector.png"
import { url } from "../../../config";
import './markedTechnic.css'
import { useAdTechnicRouter } from "../../../router/PageCreators/AdTechnicCreator ";

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

const AdMarkedTechnic:React.FC  = () => {

    const [technics, setTechnics] = useState<markedTechnicTypes[]>([]);
    const [allTechnics, setAllTechnics] = useState<markedTechnicTypes[]>([]);
    const [technic, setTechnic] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const {createAdTechnicRoute} = useAdTechnicRouter();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

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
            createAdTechnicRoute(technic);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/admin/technic${technic}`);
        }

    }, [technic, navigate]);

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };
    const filteredTechnics = filter
        ? technics.filter(technic => technic.licensePlate.toLowerCase().includes(filter.toLowerCase()))
        : technics;

    const getTechnics = (technics: markedTechnicTypes[]) => {
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
            <Header  onDataChange={handleFilterChange}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="infotechnic">
                <label className="label">
                    Закреплённая техника
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
                        {!isPending ? getTechnics( filteredTechnics) : (<tbody>
                        <td></td>
                        <td style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px"}}>Загрузка...</td>
                    
                    </tbody> )}
                </table>
            </div>
        </div>
    )
}
export default AdMarkedTechnic;