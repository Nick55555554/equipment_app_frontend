import { useEffect, useState } from "react";
import { url } from "../../../config";
import Header from "../../../components/Ordinary/header";
import { buttons } from "../config/utils";
import LeftPanel from "../../../components/Ordinary/leftPanel";

interface DivisionsTypes{
    id: number;
    address: string;

}

const Divisions = () => {
    const initialMasters:DivisionsTypes[] = 
    []
    const [masters,setMasters] = useState<DivisionsTypes[]>(initialMasters);

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
            const response = await fetch(`${url}/users/workers`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: DivisionsTypes[] = await response.json();
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


    const getMasters = ({masters} : {masters: DivisionsTypes[] }) => {
        return(
            <tbody>
                {masters.map((master) => (
                    <tr key ={master.id}>
                        <td className="left_td">
                            Имя
                        </td>
                        <td className="td">
                            {2}
                        </td>
                        <td className="td">
                            {3}
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
                    {getMasters({masters})}
                </table>
            </div>
        </div>
    )
}
export default Divisions