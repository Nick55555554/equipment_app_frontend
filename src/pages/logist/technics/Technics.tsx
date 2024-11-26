import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import "./technics.css"
import { buttons } from "../config/utils";
import leftVector from "../../../images/leftVector.png"
import { useTechnicRouter } from "../../../router/PageCreators/TechnicCreator";
import { url } from "../../../config";

interface equipmentTypeResponsesTypes{
    id: number;
    type: string;
    count: number;
}

interface TechnicTypes{
    id: number;
    name:string;
    image:string;
    equipmentTypeResponses: equipmentTypeResponsesTypes[];
}

const Technics = () => {

    const [technics, setTechnics] = useState<TechnicTypes[]>([]);
    const [allTechnics, setAllTechnics] = useState<TechnicTypes[]>([]);
    const [technic, setTechnic] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const {createTechnicRoute} = useTechnicRouter();
    const [isPending, setIsPending] = useState<boolean>(false);

    useEffect(() => {
        if(!document.cookie) {
            navigate('/auth')
        }
    }, [])
    
    const handleClickToTechnic = (e: React.MouseEvent<HTMLElement>): void => {
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
            navigate(`/technic${technic}`);
        }

    }, [technic, navigate]);


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
                const response = await fetch(`${url}/equipment/types`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: TechnicTypes[] = await response.json();
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

    

    const getTechnics = ({technics}: {technics: TechnicTypes[]}) => {
        return (
            <tbody>
            {technics.map((technic) => (
                technic.equipmentTypeResponses.length > 0 ? (
                    technic.equipmentTypeResponses.map((one) => (
                        <tr key={one.id} data-id={technic.id} onClick={handleClickToTechnic}>
                        <td className="left_td" onClick={(e) => {
                            e.stopPropagation(); 
                        }}>
                            {technic.name}
                        </td>
                        <td className="left_td">
                            {one.type}
                        </td>
                        <td className="left_td last_t">
                            <div className="status">{one.count}</div>
                            <img className="leftVector" src={leftVector} alt="Подробнее" />
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr key={technic.id} onClick={handleClickToTechnic}>
                        <td className="left_td" onClick={(e) => {
                            e.stopPropagation(); 
                        }}>
                            {technic.name}
                        </td>
                        <td className="left_td">Нет доступных типов</td>
                        <td className="left_td last_t">-</td>
                    </tr>
                )
            ))}
        </tbody>
        );
    };




//count
    return (
        <div
        className="technics">
            <Header urlToBD="/workplaces" onDataChange={setTechnics}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="infotechnic">
                <label className="label">
                    Список техники
                </label>
                </div>
            <div className="table-container-technic">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left_th">Вид техники  </th>
                            <th className="left_th">Тип техники</th>
                            <th className="left_th" >Количество</th>
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
export default Technics;

