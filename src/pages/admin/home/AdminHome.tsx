import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import "./home.css"
import question from "../../../images/Question.png"
import structure from "../../../images/structure.png"
import user from "../../../images/user.png"
import instruments from "../../../images/instruments.png"
import { useState } from "react";




const AdminHome = () => {
    const [value, setValue] = useState<unknown>(null)
    const buttons = [
        {text: "Пользователи",
        icon: <img src={user} alt="Пользователи" style={{height:'40px', width:"40px"}}/>,url: "/admin"},
        {text: "Подразделения",icon:<img src={structure} alt="Подразделения"  style={{height:'38px', width:"34px"}}/>,url: "/admin"},
        {text: "Оборудование", icon:<img src={instruments} alt="Оборудование"  style={{height:'38px', width:"38px"}}/>,url: "/admin"},
        {text: "Справочная информация",icon:<img src={question} alt="Справочная информация"  style={{height:'40px', width:"40px"}}/> , url: '/admin'}
    ]
    return (
        <div
        className="home">
            <Header onDataChange={setValue}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Пользователи
                </label>
            </div>
            <div className="table-container">
                <table
            className="table">
                    <thead>
                        <tr>
                            <th className="head fio">ФИО</th>
                            <th className='head'>Заявок подано</th>
                            <th className='head'>Заявок принято</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="left_td">Апраксия Леонидавия Колъкна</td>
                            <td className="td">8</td>
                            <td className="td">0</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>
                        
                        <tr>
                            <td className="left_td">Анонанов Фероний Ликерович</td>
                            <td className="td">2</td>
                            <td className="td">9</td>
                        </tr>

                        
                    </tbody>
                    
                    
                </table>
            </div>
        </div>
    )
}
export default AdminHome;