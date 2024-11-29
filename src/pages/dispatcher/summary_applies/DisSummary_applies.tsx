import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useLocation } from "react-router";
import "./summary_applies.css"
import { buttons, formatData } from "../config/utils";
import leftVector from "../../../images/leftVector.png"
import { url } from "../../../config";
import { useDisSummaryApplyRouter } from "../../../router/PageCreators/DisSummaryApplyCreator";

interface Summary_appliesTypes{
    id: number;
    managerName:string;
    state: string;
    date: string;
}

const DisSummary_applies = () => {
    const [applies, setApplies] = useState<Summary_appliesTypes[]>([]);
    const [allApplies, setAllApplies] = useState<Summary_appliesTypes[]>([]);
    const [apply, setApply] = useState<string | null>(null);
    const [state, setState] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const location = useLocation();
    const navigate = useNavigate();
    const {createDisSummaryApplyRoute} = useDisSummaryApplyRouter();
    const [isPending, setIsPending] =useState<boolean>(false);

    useEffect(() => {
        if(!document.cookie) {
            navigate('/auth')
        }
    }, [])

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
        } 
    }
    useEffect(() => {
        getTable()
    },[])


    
    const handleClickToApply = (e: React.MouseEvent<HTMLElement>): void => {
        const clickedElement = e.target as HTMLElement;
        const childTd = clickedElement.closest('tr');
        const dataId = childTd?.getAttribute('data-id');
        const stateId = childTd?.getAttribute('state-id')
        if (dataId && stateId) {
            console.log(apply)
            setApply(dataId);
            setState(stateId)
        }
    }
    useEffect(() => {
        if (apply && state) {
            
            createDisSummaryApplyRoute(apply, state);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/dispatcher/summary_apply${apply}`);
        }

    }, [apply, navigate]);

    const toggleSelect = (number: number) => {
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
        setApplies(allApplies.filter(apply => apply.state === "NEW"));
    };

    const handleClickWorking = () => {
        setApplies(allApplies.filter(apply => apply.state === "CLOSED"));
    };

    const handleClickArchiv = () => {
        setApplies(allApplies.filter(apply => apply.state === "ARCHIVED"));
    };

    


    const getApplies = (applies: Summary_appliesTypes[]) => {
        return (
            <tbody>
                {applies.map((apply) => (
                    <tr key={apply.id} data-id={apply.id} state-id={apply.state} onClick={handleClickToApply}>
                        <td className="left_td" onClick={(e) => {
                            e.stopPropagation(); 
                            toggleSelect(apply.id);
                        }}>
                            <div className={`circle ${selectedItems.has(apply.id) ? 'active' : ''}`}>
                                <div className="checkmark">✔</div>
                            </div>
                                <div className="number">
                                    {apply.id}
                                </div>
                        </td>
                        <td className="left_td ">
                            {apply.managerName}
                        </td>
                        <td className="left_td someleft">
                            <div className="">
                                {apply.state === "NEW" && "Открытая"}
                                {apply.state === "CLOSED" && "В работе"}
                                {apply.state === "ARCHIVED" && "В архиве"}        
                            </div>
                            
                        </td>
                        <td className="left_td last_t someleft">
                            {formatData(apply.date)}
                            <img className="leftVector2" src={leftVector} alt="Подробнее" />
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    useEffect(()=>{
        getApplies(applies);
    },[applies])

    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const filtredApplies = filter
        ? applies.filter(apply => apply.id.toString().toLowerCase().includes(filter.toLowerCase()))
        : applies; 


    return (
        <div
        className="summary_applies">
            <Header  onDataChange={handleFilterChange}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Сводные заявки
                </label>
                <div className="poisk_applies">
                    <button className="buttonDis "onClick={handleClickOpen}>Открытые</button>
                    <button className="buttonDis"onClick={handleClickWorking}>В работе</button>
                    <button className="buttonDis"onClick={handleClickArchiv}>Архив</button>
                </div>
            </div>
            <div className="table-container-apply">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Номер заявки</th>
                            <th className="left_thleft" >Логист</th>
                            <th className="left_thleft " >Статус</th>
                            <th className="left_thleft left_thleft" >Дата</th>
                        </tr>
                    </thead>
                        {!isPending ? getApplies(filtredApplies): (<div>
                            <div style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px", marginLeft:"600px"}}>Загрузка...</div>
                    </div> )}
                </table>
            </div>
        </div>
    )
}
export default DisSummary_applies;