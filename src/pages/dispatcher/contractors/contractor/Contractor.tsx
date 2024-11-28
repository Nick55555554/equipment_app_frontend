import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import { useEffect, useState } from "react"
import { buttons } from "../../config/utils"
import { Chart, registerables } from 'chart.js';
import { url } from "../../../../config"
import "./contractor.css";
import { SmallTableDis } from "./SmalTableDis";
import { SmallTableLODis } from "./SmallTableLastOrder";

interface ContracterType{
    id: number;
    name:string;
    inn: string;
    kpp: string;
    legalAddress: string;
    phoneNumber: string,

}

Chart.register(...registerables);


const Contractor = ({ number }: { number: string }) => {
    const [contractor, setContractors] = useState<ContracterType | null>(null);
    
    const [isPending, setIsPending] = useState<boolean>(false); 

    useEffect(() => {

        setIsPending(true)
        const dataFetch = async () => {
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
                const response = await fetch(`${url}/contractor/${number}`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: ContracterType = await response.json();
                console.log("Response data:", responseData);
                setContractors(responseData);
                setIsPending(false);
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        
        dataFetch();

    },[])
            

    return (
        <div className="contractor">
        <Header  onDataChange={null}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoContractorMark">

            <label className="label3first">
                    ООО "{contractor?.name}"
                </label>
            <div className="smallContractormark">
                <div className="heighWeightContractor">ИНН:<div className="lowWeightC">{contractor?.inn}</div></div>
                <div className="heighWeightContractor">КПП:<div className="lowWeightC">{contractor?.kpp}</div></div>
                <div className="heighWeightContractor">Юр. адрес:<div className="lowWeightC">{contractor?.legalAddress}</div></div>
            </div>
            <label className="label3">
                    Техника
                </label>
            <SmallTableDis/>
            <label className="label3">
                    Последние заказы
                </label>
            <SmallTableLODis/>
        </div>
    </div>
    
    )
}
export default Contractor;
