import Input from "../../UI/input/index"
import "./header.css"
import settings from "../../../images/settings.png"
import  bell  from "../../../images/Bell.png"
import { SetStateAction } from "react";
interface inputPropsWithHeader{
    urlToBD: string;
    onDataChange:SetStateAction<any>;
}

const Header:React.FC<inputPropsWithHeader> = ({urlToBD, onDataChange }) => {

    const bellClickHandler = () => {

    }
    const settingsClickHandler = () => {
        
    }
    return (
        <div 
        className="header">
            <Input width={40} urlToBD={urlToBD} onDataChange= {onDataChange}/>
            <div className="icons">
                <img
                className="bellIcon"
                src={bell}
                alt='Уведомления'
                onClick={bellClickHandler}
                />
                <img
                style={{display: "none"}}
                className="settingIcon"
                src={settings}
                alt='Настройки'
                onClick={settingsClickHandler}
            />
            </div>
        </div>
    )
}
export default Header;