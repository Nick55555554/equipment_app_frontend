import { useEffect, useState } from "react";
import { url } from "../../../config";
import Header from "../../../components/Ordinary/header";
import { buttons } from "../config/utils";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import "./divisions.css"

interface DivisionsTypes{
    id: number;
    address: string;
    requests: number;
    workplaces:number
}


const Divisions = () => {

    const [divisions,setDivisions] = useState<DivisionsTypes[]>([]);

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
            const response = await fetch(`${url}/unit`, requestOption)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: DivisionsTypes[] = await response.json();
            console.log("Response data:", responseData);
            setDivisions(responseData);
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


    const getMasters = (divisions: DivisionsTypes[] ) => {
        return(
            <tbody>
                {divisions.map((division) => (
                    <tr key ={division.id}>
                        <td className="left_tdDis">
                            {division.address}
                        </td>
                        <td className="Div_td">
                            {division.workplaces}
                        </td>
                        <td className="Div_td">
                            {division.requests}
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }

    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const filteredTechnics = filter
        ? divisions.filter(master => master.address.toString().toLowerCase().includes(filter.toLowerCase()))
        : divisions;
    return (
        <div
        className="home">
            <Header  onDataChange={handleFilterChange}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Подразделения
                </label>
            </div>
            <div className="table-container">
                <table
            className="table">
                    <thead>
                        <tr>
                            <th className="head fio">Адрес</th>
                            <th className='head'>Объектов</th>
                            <th className='head'>Заявок</th>
                        </tr>
                    </thead>
                    {getMasters(filteredTechnics)}
                </table>
            </div>
        </div>
    )
}
export default Divisions