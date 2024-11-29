import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import "./technics.css"
import { buttons } from "../home/AdminHome"
import leftVector from "../../../images/leftVector.png"

import { url } from "../../../config";
import { useAdMarkedTechnicRouter } from "../../../router/PageCreators/AdMarkedTechnicCreator";

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

const AdTechnics = () => {

    const [technics, setTechnics] = useState<TechnicTypes[]>([]);
    const [allTechnics, setAllTechnics] = useState<TechnicTypes[]>([]);
    const [timeGo, setTimego] = useState<string>('')
    const [timeout, setTimeout] = useState<string>('')
    const [timeWork, setTimeWork] = useState<string>('')
    const [timeWait, setTimeWait] = useState<string>('')
    const [odometrGo, setOdometrgo] = useState<string>('')
    const [odometrOut, setOdometrOut] = useState<string>('')
    const [technic, setTechnic] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const {createAdMarkedTechnicRoute} = useAdMarkedTechnicRouter();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [closeWindow, setCloseWindow] = useState<boolean>(false)
    const closeTechnicWindow = () => {
        setCloseWindow(false)
    }
    useEffect(() => {
        if(!document.cookie) {
            navigate('/auth')
        }
    }, [])
    
    const handleClickToTechnic = (e: React.MouseEvent<HTMLElement>): void => {
        const clickedElement = e.currentTarget as HTMLElement;
        const technicId = clickedElement.getAttribute('data-id');
        console.log("Clicked technic ID:", technicId)
        if (technicId) {
            setTechnic(technicId); 
        }
    };

    useEffect(() => {
        if (technic) {
            createAdMarkedTechnicRoute(technic);
            localStorage.setItem(location.pathname,location.pathname)
            console.log('check', technic)
            navigate(`/admin/markedtechnic${technic}`);
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

    

    const getTechnics = (technics: TechnicTypes[]) => {
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
                            <img className="leftVectorT" src={leftVector} alt="Подробнее" />
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

    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const filteredTechnics = filter
        ? technics.filter(technic => technic.name.toString().toLowerCase().includes(filter.toLowerCase()))
        : technics; 

    return (
        <div
        className="technics"> 
            <Header  onDataChange={handleFilterChange}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="infotechnic">
                <label className="label">
                    Список техники  
                </label>
                <label className="ButtonLabelToAdd" onClick={() => setCloseWindow(true)}>Добавить технику</label>
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
                        {!isPending ? getTechnics(filteredTechnics) : (<tbody>
                        <td></td>
                        <td style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px"}}>Загрузка...</td>
                    
                    </tbody> )}
                </table>
            </div>
            {closeWindow &&
            <>
                    <div className="overlay" onClick={closeTechnicWindow}></div>
                    <div className="windowallTechnic">
                        <div className="allTechnic">
                            <label className="label bv"> Добавление техники</label>
                            </div>
                        <div className="dannieTwotec">
                            <div className="bukviTwoTwo">Время выезда</div>
                            <div className="bukviTwoTwo">Время прибытия</div>
                        </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo" onChange={(e) => { setTimego(e.target.value) }} />
                            <input className="inputListonlyTwo" onChange={(e) => { setTimeout(e.target.value) }} />
                        </div>
                        <div className="dannieTwotec">
                            <div className="bukviTwoTwo">Время работы</div>
                            <div className="bukviTwoTwo">Время ожидания</div>
                        </div>
                        <div className="dannieButton">
                            <input onChange={(e) => { setTimeout(e.target.value) }} className="inputListonlyTwo" />
                            <input onChange={(e) => { setTimeWait(e.target.value) }} className="inputListonlyTwo" />
                        </div>
                        <div className="dannieTwotec">
                            <div className="bukviTwoTwo">При выезде</div>
                            <div className="bukviTwoTwo">По возвращении</div>
                        </div>
                        <div className="dannieButton">
                            <input onChange={(e) => { setOdometrgo(e.target.value) }} className="inputListonlyTwo" />
                            <input onChange={(e) => { setOdometrOut(e.target.value) }} className="inputListonlyTwo" />
                        </div>
                    <button className="ButtonReallyToAdd">Добавить технику</button>

                    </div>
                </>
            }
        </div>
    )
}
export default AdTechnics;

