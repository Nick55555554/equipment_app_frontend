import Li from "../../UI/li/index";
import "./leftPanel.css"
import logout from "../../../images/LogOut.png"
import { liProps } from "../../UI/li/Li";
import React from "react";
interface leftPanelProps{
    buttons:liProps[];
    cssChange: boolean;
}


const LeftPanel:React.FC<leftPanelProps> = ({buttons,cssChange}) => {
    return(
        <div
        className={`leftPanel ${cssChange ? 'fixedPanel' : ''}`}>
            <div 
            className="data">
                <label
                className="name"
                >Имя</label>
                <label
                className="status"
                >Архитектор</label>
            </div>
            <img
            className="logoutIcon" 
            src={logout}
            alt='Выйти'
            />
            <ul
            className="ul"
            >
                {buttons.map((button, index) => (
                    <React.Fragment key={index}>
                        {index !== buttons.length - 1 ? (
                        <Li key={index}  text={button.text} icon = {button.icon} url={button.url}/> 
                        ) : (
                        <Li last = {true} text={button.text} icon = {button.icon} url={button.url} />
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}
export default LeftPanel