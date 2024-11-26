import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../config/utils";
import "./home.css"
import { url } from "../../../config";
import { useNavigate } from "react-router";

interface MastersTypes{
    id: number;
    name:string;
    currentWorkPlaceAddress: string;
    sentRequest: string;
}

const Home = () => {
    const navigate = useNavigate();
    const initialMasters:MastersTypes[] = []
    const [masters,setMasters] = useState<MastersTypes[]>(initialMasters);
    const [isPending, setIsPending] =useState<boolean>(false);
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
            const response = await fetch(`${url}/users/workers`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: MastersTypes[] = await response.json();
            console.log("Response data:", responseData);
            setMasters(responseData);
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


    const getMasters = ({masters} : {masters: MastersTypes[] }) => {
        return(
            <tbody>
                {masters.map((master) => (
                    <tr key ={master.id}>
                        <td className="left_td">
                            Имя
                        </td>
                        <td className="td">
                            {master.currentWorkPlaceAddress}
                        </td>
                        <td className="td">
                            {master.sentRequest}
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }
    return (
        <div
        className="home">
            <Header urlToBD="/" onDataChange={setMasters}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Мастера бригад
                </label>
            </div>
            <div className="table-container">
                <table
            className="table">
                    <thead>
                        <tr>
                            <th className="head fio">ФИО</th>
                            <th className='head'>Адрес места работы</th>
                            <th className='head'>Заявок подано</th>
                        </tr>
                    </thead>
                    {!isPending ? getMasters({masters}) : (<tbody>
                        <td></td>
                        <td style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px"}}>Загрузка...</td>
                    
                    </tbody> )}
                </table>
            </div>
        </div>
    )
}
export default Home;