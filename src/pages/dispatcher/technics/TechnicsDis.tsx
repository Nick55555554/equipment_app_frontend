import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import "./technics.css"
import { buttons } from "../config/utils";
import leftVector from "../../../images/leftVector.png"
import { useTechnicRouter } from "../../../router/PageCreators/TechnicCreator";
interface TechnicTypes{
    id: number;
    number:string;
    vid:string;
    type: string;
    status: string;
}

const TechnicsDis = () => {
    const initialTechnic:TechnicTypes[] = 
    [
        {
            id: 1,
            number: 'A232',
            vid: "Трактор",
            type: "8 тонн",
            status: "Простаивает",
        },
        {
            id: 2,
            number: 'A232',
            vid: "Трактор",
            type: "16 тонн",
            status: "Задействованна",
        },
        {
            id: 3,
            number: 'A232',
            vid: "Трактор",
            type: "8 тонн",
            status: "Простаивает",
        },
    ]
    const [technics, setTechnics] = useState<TechnicTypes[]>(initialTechnic);
    const [allTechnics, setAllTechnics] = useState<TechnicTypes[]>(initialTechnic);
    const [technic, setTechnic] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const {createTechnicRoute} = useTechnicRouter();


    
    const handleClickToTechnic = (e: React.MouseEvent<HTMLElement>): void => {
        const clickedElement = e.target as HTMLElement;
        const childTd = clickedElement.closest('td');
        const number = childTd?.previousElementSibling?.previousElementSibling?.textContent
        if (number) {
            setTechnic(number);
        };
    };
    useEffect(() => {
        if (technic) {
            createTechnicRoute(technic);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/technic${technic}`);
        }

    }, [technic, navigate]);



    const handleClickGetUsed = () => {
        setTechnics(allTechnics.filter(technic => technic.status === "Задействованна"));
    };

    const handleClickStanding = () => {
        setTechnics(allTechnics.filter(technic => technic.status === "Простаивает"));
    };

    const handleClickMarked = () => {
        setTechnics(allTechnics.filter(technic => technic.status === "Закреплённая"));
    };



    const getTechnics = ({technics}: {technics: TechnicTypes[]}) => {
        return (
            <tbody>
                {technics.map((technic) => (
                    <tr key={technic.id} onClick={handleClickToTechnic}>
                        <td className="left_td" onClick={(e) => {
                            e.stopPropagation(); 
                        }}>
                            {technic.number}
                        </td>
                        <td className="left_td">
                            {technic.vid}
                        </td>
                        <td className="left_td">
                            {technic.type}
                        </td>
                        <td className="left_td last_t">
                        <div className="status">{technic.status} </div><img className="leftVector" src={leftVector} alt="Подробнее" />
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };





    return (
        <div
        className="technics">
            <Header urlToBD="/workplaces" onDataChange={setTechnics}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Техника
                </label>
                <div className="poisk_technics">
                    <button className="button "onClick={handleClickGetUsed}>Задействованная</button>
                    <button className="button"onClick={handleClickStanding}>Простаивающая</button>
                    <button className="button"onClick={handleClickMarked}>Закреплённая</button>
                </div>
            </div>
            <div className="table-container-technic">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left_th">Номер </th>
                            <th className="left_th">Вид техники </th>
                            <th className="left_th" >Тип техники</th>
                            <th className="left_th last_t" >Статус</th>
                        </tr>
                    </thead>
                        {getTechnics({ technics })}
                </table>
            </div>
        </div>
    )
}
export default TechnicsDis;

