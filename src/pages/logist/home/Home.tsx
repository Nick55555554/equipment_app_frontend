import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../config/utils";
import "./home.css";
import { url } from "../../../config";
import { useNavigate } from "react-router";

interface MastersTypes {
    id: number;
    workerName: string;
    currentWorkPlaceAddress: string;
    sentRequest: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [masters, setMasters] = useState<MastersTypes[]>([]);
    const [allMasters, setAllMasters] = useState<MastersTypes[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [cookie, setCookie] = useState<string | null>(document.cookie);
    const [filter, setFilter] = useState<string | null>(''); 


    useEffect(() => {
        if (!cookie) {
            navigate('/auth');
        }
    }, [cookie]);

    const getTable = async () => {
        const token = document.cookie.split('=')[1];

        setIsPending(true);
        const requestOption: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": `Bearer ${token}`
            }
        };
        try {
            const response = await fetch(`${url}/users/workers`, requestOption);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const responseData: MastersTypes[] = await response.json();
            console.log("Response data:", responseData);
            setMasters(responseData);
            setAllMasters(responseData);
        } catch (error) {
            console.log("Fetch error:", error);
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        getTable();
    }, []);
    const handleFilterChange = (value: string) => { 
        setFilter(value);
    };
    const filteredMasters = filter ? allMasters.filter(master => master.workerName.toLowerCase().includes(filter.toLowerCase())) : []
    const result = filteredMasters.length > 0 ? filteredMasters : allMasters


    const getMasters = () => {
        return (
            <tbody>
                {result?.map((master) => (
                    <tr key={master.id}>
                        <td className="left_td">
                            {master.workerName}
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
        );
    };

    return (
        <div className="home">
            <Header onDataChange={handleFilterChange} /> {/* Передаем функцию для обработки ввода */}
            <LeftPanel buttons={buttons} cssChange={false} />
            <div className="info">
                <label className="label">
                    Мастера бригад
                </label>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head fio">ФИО</th>
                            <th className='head'>Адрес места работы</th>
                            <th className='head'>Заявок подано</th>
                        </tr>
                    </thead>
                    {!isPending ? getMasters() : (
                        <tbody>
                            <tr>
                            <td>
                                </td>
                                <td colSpan={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "32px" }}>
                                    Загрузка...
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Home;
