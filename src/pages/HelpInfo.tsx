import Header from "../components/Ordinary/header";
import LeftPanel from "../components/Ordinary/leftPanel";
import { buttons } from "./logist/config/utils";

const HelpInfo = () => {
    
    return (
        <div
        className="roadList">
        <Header  onDataChange={() => {}}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoRoadList">
                <label className="label"> Справочная информация</label>
                <div 
                    className="bigAnalytishForHELP">
                        <div className="heighWeightHELPFIRST">Телефон информационно-справчоной службы:<span className="lowWeight">8-800-5555-35-35</span></div>
                        <div className="heighWeightHELP">График работы :<span className="lowWeight">пн-пт, 7:00-15:00</span></div>
                        <div className="heighWeightHELP">Электронная почта:<span className="lowWeight">kvak_agout_it@mirea.ru</span></div>
                        <div className="heighWeightHELP">Адрес офиса:<span className="lowWeight">14141, г. Москва, Кутузова 36</span></div>
                    </div> 
                
        </div>
    </div>
    )
}
export default HelpInfo;