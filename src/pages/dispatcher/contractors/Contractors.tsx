import { useEffect, useState } from "react";
import Header from "../../../components/Ordinary/header";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import { buttons } from "../config/utils";
import { useLocation, useNavigate } from "react-router-dom";
import leftVector from "../../../images/leftVector.png"
import { url } from "../../../config";
import './contractors.css'
import { useContractRouter } from "../../../router/PageCreators/ContractorCreator";


interface ContractorType{
    id: number,
    name: string,
    legalAddress: string,
    phoneNumber:string;
}

const Contractors = () => {

    const [contractors, setContractors] = useState<ContractorType[]>([]);
    const [contractor, setContractor] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const {createContractRoute} = useContractRouter();
    const [isPending, setIsPending] = useState<boolean>(false);

    const [cookie, setCookie] = useState<string | null>(document.cookie);

    useEffect(() => {
        if(!cookie) {
            navigate('/auth')
        }
    }, [cookie])

    useEffect(() => {
        setIsPending(true)
        const myfetch = async () => {
            const token = document.cookie.split('=')[1]
            const requestOption: RequestInit  = {
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`
                    
                }
            }
            try {
                const response = await fetch(`${url}/contractor`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: ContractorType[] = await response.json();
                console.log("Response data:", responseData);
                setContractors(responseData);
                setIsPending(false);
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        myfetch();
    },[])
    
    const handleClickTContractor = (e: React.MouseEvent<HTMLElement>): void => {
        const clickedElement = e.target as HTMLElement;
        const childTd = clickedElement.closest('tr');
        const contractorcId = childTd?.getAttribute('data-id');
        if (contractorcId) {
            setContractor(contractorcId); 
        }
    };

    useEffect(() => {
        if (contractor) {
            createContractRoute(contractor);
            localStorage.setItem(location.pathname,location.pathname)
            navigate(`/contractor${contractor}`);
        }

    }, [contractor, navigate]);

    const getTechnics = (contractors: ContractorType[]) => {
        return (
            <tbody>

                {contractors.map((contractor) => (
                    <tr key={contractor.id} data-id={contractor.id} onClick={handleClickTContractor}>
                        <td className="left_tdDis"  onClick={(e) => {
                            e.stopPropagation(); 
                        }}>
                            {contractor.name}
                        </td>
                        <td className="left_tdDis">
                            {contractor.phoneNumber}
                        </td>
                        <td className="left_tdDisSmallPadding last_tdDis">
                        <div className="state">{contractor.legalAddress}</div>
                        </td>
                        <td> <img className="leftVectorDis" src={leftVector} alt="Подробнее" /></td>
                    </tr>
                ))}
            </tbody>
        );
    };

    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const filteredContractors = filter
        ? contractors.filter(contractor => contractor.name.toString().toLowerCase().includes(filter.toLowerCase()))
        : contractors; 

    return(
        <div
        className="technics">
            <Header  onDataChange={handleFilterChange}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="infotechnic">
                <label className="label">
                    Подрядчики
                </label>
                </div>
            <div className="table-container-technic">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left_th5">Назввание </th>
                            <th className="left_th5">Номер телефона </th>
                            <th className="th contractorthLast" >Адрес</th>
                            <th className="gap"></th>
                        </tr>
                    </thead>
                        {!isPending ? getTechnics( filteredContractors ) : (<tbody>
                        <td></td>
                        <td style={{display:"flex", justifyContent:"center",alignContent:"center",textAlign:"center", fontSize:"32px"}}>Загрузка...</td>
                    
                    </tbody> )}
                </table>
            </div>
        </div>
    )
}
export default Contractors;