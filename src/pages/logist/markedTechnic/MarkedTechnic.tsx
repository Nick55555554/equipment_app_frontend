import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../config/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useTechnicRouter } from "../../../router/TechnicCreator";
import leftVector from "../../../images/leftVector.png"

interface TechnicTypes{
    id: number;
    number:string;
    vid:string;
    type: string;
}

const MarkedTechnic = () => {

    const [technics, setTechnics] = useState<TechnicTypes[]>([]);
    const [allTechnics, setAllTechnics] = useState<TechnicTypes[]>();
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
                        <td className="left_td last_t">
                        <div className="status">{technic.type}</div><img className="leftVector" src={leftVector} alt="Подробнее" />
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
                        {getTechnics({ technics })}
                </table>
            </div>


        </div>
    )
}
export default MarkedTechnic;