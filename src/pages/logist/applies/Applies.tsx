import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useApplyRouter } from "../../../router/PageCreators/ApplyCreator";
import { useLocation } from "react-router";
import "./applies.css"
import { buttons } from "../config/utils";
import leftVector from "../../../images/leftVector.png"
import { url } from "../../../config";

interface ApplyTypes{
    id: number;
    workplaceAddress: string;
    workerName: string;
    equipmentCount: number;
    date: string;
    progress: number;
    total: number;
    state: string;
}


const Applies = () => {
    const initialApplies:ApplyTypes[] = []
    const [applies, setApplies] = useState<ApplyTypes[]>(initialApplies);
    const [allApplies, setAllApplies] = useState<ApplyTypes[]>(initialApplies);
    const [apply, setApply] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const location = useLocation();
    const navigate = useNavigate();
    const {createApplyRoute} = useApplyRouter();
    const [pathToApply, setPathToApply] = useState<boolean>(false);


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
        try {
            const response = await fetch(`${url}/requests`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: ApplyTypes[] = await response.json();
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

    
    
    const handleClickToApply =  (e: React.MouseEvent<HTMLElement> ):  void => {
        
        const clickedElement = e.target as HTMLElement;
        const childTd = clickedElement.closest('td');
        const number = childTd?.previousElementSibling?.previousElementSibling?.children[1]?.textContent;
        if (number) {
            setApply(number);
        }
    }

    useEffect(() => {
        if (apply) {
            createApplyRoute(apply);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/apply${apply}`);
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

    const handleClickNew = () => {
        setApplies(allApplies.filter(apply => apply.state === "Новая"));
    };

    const handleClickProcessed = () => {
        setApplies(allApplies.filter(apply => apply.state === "Обработанная"));
    };

    const handleClickFinished = () => {
        setApplies(allApplies.filter(apply => apply.state === "Завершённая"));
    };

    const handleClickAll = () => {
        setApplies(allApplies);
    };
    


    const getApplies = ({ applies }: { applies: ApplyTypes[] }) => {
        return (
            <tbody>
                {applies.map((apply) => {
                    let displayState;
    
                    switch (apply.state) {
                        case "SENT":
                            displayState = "Новая";
                            break;
                        case "CURRENT":
                            displayState = "Обработанна";
                            break;
                        case "FINISHED":
                            displayState = "Завершённая";
                            break;
                        default:
                            displayState = apply.state; 
                    }
    
                    return (
                        <tr key={apply.id} onClick={handleClickToApply}>
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
                            <td className="left_td">
                                {apply.workerName}
                            </td>
                            <td className="left_td last_t">
                                <div className="status">{displayState}</div>
                                <img className="leftVector" src={leftVector} alt="Подробнее" />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };
    

    useEffect(()=>{
        getApplies({applies});
        console.log(applies)
    },[applies])

    return (
        <div
        className="applies">
            <Header urlToBD="/workplaces" onDataChange={setAllApplies}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Заявки
                </label>
                <div className="poisk_applies">
                    <button className="button "onClick={handleClickNew}>Новые</button>
                    <button className="button"onClick={handleClickProcessed}>Обработанные</button>
                    <button className="button"onClick={handleClickFinished}>Завершённые</button>
                    <button className="button"onClick={handleClickAll}>Выбрать все</button>
                </div>
            </div>
            <div className="table-container-apply">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left_th">Номер заявки</th>
                            <th className="left_th" >Мастер</th>
                            <th className="left_th last_t" >Статус</th>
                        </tr>
                    </thead>
                        {getApplies({ applies })}
                </table>
            </div>
        </div>
    )
}
export default Applies;