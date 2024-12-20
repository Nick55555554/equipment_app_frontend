import Li from "../../UI/li/index";
import "./leftPanel.css"
import logout from "../../../images/LogOut.png"
import { liProps } from "../../UI/li/Li";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext  } from "../../../context/AuthProvider";


interface leftPanelProps{
    buttons:liProps[];
    cssChange: boolean;
}


const LeftPanel:React.FC<leftPanelProps> = ({buttons,cssChange}) => {
    const navigate = useNavigate();
    const [namemy, setNamemy] = useState<string>("")
    const [statusmy, setStatusmy] = useState<string>("")
    const {name, status} = useContext(AuthContext);
    function deleteAllCookies() {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }
    useEffect(() =>{
        setNamemy(name)
        setStatusmy(status);
    },[name])

    const handleClickOut = () => {
        Swal.fire({
            title: 'Вы точно хотите выйти?',
            text: "Вы не сможете отменить это действие!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Выйти',
            cancelButtonText: 'Остаться',
            customClass: {
                confirmButton: 'swal-button--confirm',
                cancelButton: 'swal-button--cancel'
            }
        }).then((result: any) => {
            if (result.isConfirmed) {
                deleteAllCookies();
                navigate('/auth');
            } 
        });
    };
    

    return(
        <div
        className={`leftPanel ${cssChange ? 'fixedPanel' : ''}`}>
            <div 
            className="data">
                <label
                className="name"
                >{namemy}</label>
                <label
                className="status"
                >{status}</label>
            </div>
            <img
            className="logoutIcon" 
            src={logout} onClick={handleClickOut}
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