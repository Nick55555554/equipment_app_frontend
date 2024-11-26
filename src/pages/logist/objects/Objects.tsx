import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../config/utils";
import "./objects.css"
import {url} from '../../../config'
import { useNavigate } from "react-router";

interface Workplace{
    id: number;
    address:string;
    requestsProcessed:string;
    requestsSent: string;
}

const Objects = () => {
    const initialMasters: Workplace[] = []
    const [objects,setObjects] = useState<Workplace[]>(initialMasters);
    const [isPending, setIsPending] =useState<boolean>(false);
    const navigate = useNavigate();
    const [cookie, setCookie] = useState<string | null>(document.cookie);

    useEffect(() => {
        if(!cookie) {
            navigate('/auth')
        }
    }, [cookie])

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
            const response = await fetch(`${url}/workplaces`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: Workplace[] = await response.json();
            console.log("Response data:", responseData);
            setObjects(responseData)
            setIsPending(false)
        } catch(error) {
            console.log("Fetch error:", error);
            setIsPending(false)
        } finally{
            setIsPending(false)
        }
    }
    useEffect(() => {
        getTable()
        console.log(isPending);
    },[])


    const getObjects = ({objects} : {objects: Workplace[] }) => {
        return(
            <tbody>
                {objects.map((object) => (
                    <tr key ={object.id}>
                        <td className="left_td">
                            {object.address}
                        </td>
                        <td className="td">
                            {object.requestsProcessed}
                        </td>
                        <td className="td">
                            {object.requestsSent}
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }
    return (
        <div
        className="object">
            <Header urlToBD="workplaces" onDataChange={setObjects}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Объекты
                </label>
            </div>
            <div className="table-container">
                <table
            className="table">
                    <thead>
                        <tr>
                            <th className="head fio">Адрес объекта</th>
                            <th className='head'>Заявок подано</th>
                            <th className='head'>Заявок принято</th>
                        </tr>
                    </thead>
                    {isPending ? 
                    (<tbody>
                        <td></td>
                        <td style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px"}}>Загрузка...</td>
                    
                    </tbody> ): null}
                    {getObjects({objects})}                       
                </table>
            </div>
        </div>
    )
}
export default Objects;