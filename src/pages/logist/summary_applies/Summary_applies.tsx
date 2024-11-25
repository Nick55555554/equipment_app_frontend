import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useLocation } from "react-router";
import "./summary_applies.css"
import { buttons } from "../config/utils";
import leftVector from "../../../images/leftVector.png"
import { url } from "../../../config";
import { useSummaryApplyRouter } from "../../../router/PageCreators/SummaryApplyCreator";

interface Summary_appliesTypes{
    id: number;
    number:string;
    managerName:string;
    state: string;
    date: string;
}

const Summary_applies = () => {
    const [applies, setApplies] = useState<Summary_appliesTypes[]>([]);
    const [allApplies, setAllApplies] = useState<Summary_appliesTypes[]>([]);
    const [apply, setApply] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const location = useLocation();
    const navigate = useNavigate();
    const {createSummaryApplyRoute} = useSummaryApplyRouter();

    const [isPending, setIsPending] =useState<boolean>(false);
    const getTable = async() => {
        const token = document.cookie.split('=')[1]

        setIsPending(true)
        const requestOption: RequestInit  = {
            method: "GET",
            headers: {
                "Content-type": 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": `Bearer ${token}`
                
            }
        }
        console.log("Fetching from URL:", `${url}/summary`);
        try {
            const response = await fetch(`${url}/summary`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: Summary_appliesTypes[] = await response.json();
            console.log("Response data:", responseData);
            setApplies(responseData);
            setAllApplies(responseData);
            setIsPending(false);

        } catch(error) {
            console.log("Fetch error:", error);
            setIsPending(false)
        } finally{
            setIsPending(false)
        }
    }
    useEffect(() => {
        getTable()
    },[])


    
    const handleClickToApply = (e: React.MouseEvent<HTMLElement>): void => {
        const clickedElement = e.target as HTMLElement;
        const childTd = clickedElement.closest('tr');
        const dataId = childTd?.getAttribute('data-id');
        
        if (dataId) {
            setApply(dataId);
        }
    }
    useEffect(() => {
        if (apply) {
            
            createSummaryApplyRoute(apply);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/summary_apply${apply}`);
        }

    }, [apply, navigate]);

    const toggleSelect = (number: string) => {
        setSelectedItems(prev => {
            const newSelectedItems = new Set(prev);
            if (newSelectedItems.has(number)) {
                newSelectedItems.delete(number);
            } else {
                newSelectedItems.add(number);
            }
            return newSelectedItems;
        });
    };

    const handleClickOpen = () => {
        setApplies(allApplies.filter(apply => apply.state === "Новая"));
    };

    const handleClickWorking = () => {
        setApplies(allApplies.filter(apply => apply.state === "В работе"));
    };

    const handleClickArchiv = () => {
        setApplies(allApplies.filter(apply => apply.state === "В архиве"));
    };

    const handleClickAll = () => {
        setApplies(allApplies);
    };
    


    const getApplies = ({applies}: {applies: Summary_appliesTypes[]}) => {
        return (
            <tbody>
                {applies.map((apply) => (
                    <tr key={apply.id} data-id={apply.id} onClick={handleClickToApply}>
                        <td className="left_td" onClick={(e) => {
                            e.stopPropagation(); 
                            toggleSelect(apply.number);
                        }}>
                            <div className={`circle ${selectedItems.has(apply.number) ? 'active' : ''}`}>
                                <div className="checkmark">✔</div>
                            </div>
                                <div className="number">
                                    {apply.number}
                                </div>
                        </td>
                        <td className="left_td">
                            {apply.managerName}
                        </td>
                        <td className="td">
                            <div className="status">
                                {apply.state === "NEW" && "Новая"}
                                {apply.state === "CLOSED" && "В работе"}
                                {apply.state === "ARCHIVED" && "В архиве"}
                                {apply.state !== "NEW" && apply.state !== "IN_PROGRESS" && apply.state !== "ARCHIVED" && "Неизвестный статус"}
                            </div>
                            <img className="leftVector" src={leftVector} alt="Подробнее" />
                        </td>
                        <td className="left_td last_t">
                            {apply.date}
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    useEffect(()=>{
        getApplies({applies});
    },[applies])

    return (
        <div
        className="summary_applies">
            <Header urlToBD="/workplaces" onDataChange={setAllApplies}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Сводные заявки
                </label>
                <div className="poisk_applies">
                    <button className="button "onClick={handleClickOpen}>Открытые</button>
                    <button className="button"onClick={handleClickWorking}>В работе</button>
                    <button className="button"onClick={handleClickArchiv}>Архив</button>
                    <button className="button"onClick={handleClickAll}>Выбрать все</button>
                </div>
            </div>
            <div className="table-container-apply">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Номер заявки</th>
                            <th className="left_th" >Логист</th>
                            <th className="th " >Статус</th>
                            <th className="left_th last_t" >Дата</th>
                        </tr>
                    </thead>
                        {getApplies({ applies })}
                </table>
            </div>
        </div>
    )
}
export default Summary_applies;