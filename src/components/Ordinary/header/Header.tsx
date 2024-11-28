import Input from "../../UI/input/index"
import "./header.css"
import settings from "../../../images/settings.png"
import  bell  from "../../../images/Bell.png"
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router";
interface inputPropsWithHeader{
    onDataChange: ((value: string) => void) | null;
    
}

const Header:React.FC<inputPropsWithHeader> = ({ onDataChange }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const navigate = useNavigate();


    const bellClickHandler = () => {
        navigate('/notifyes')
    }
    return (
        <div 
        className="header">
            <Input width={40} onDataChange= {onDataChange}/>
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
            />
            </div>
        </div>
    )
}
export default Header;