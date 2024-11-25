import Header from "../../components/Ordinary/header"
import LeftPanel from "../../components/Ordinary/leftPanel"
import "./notifyes.css"
import { buttons } from "../logist/config/utils"
import { useState } from "react"

interface SummaryApplyProps{
    number: string;
}

const Notifyes = () => {
    const [summaryApply, setSummaryApply] = useState<SummaryApplyProps | null>(null);

    return(
        <div
        className="notifyes">
            <Header urlToBD="/workplaces" onDataChange={setSummaryApply}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Заявки
                </label>
            </div>
        </div>
    )
}
export default Notifyes;