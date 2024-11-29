import Header from "../../../components/Ordinary/header/index";
import LeftPanel from "../../../components/Ordinary/leftPanel";
import "./home.css"
import object from "../../../images/object.png"
import question from "../../../images/Question.png"
import user from "../../../images/user.png"
import technic from "../../../images/technic.png"
import markedTechnic from '../../../images/markedTechnic.png'
import roadList from '../../../images/roadList.png'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const buttons = [
    {text: "Пользователи",
    icon: <img src={user} alt="Пользователи" style={{height:'40px', width:"40px"}}/>,url: "/admin"},
    {text: "Объекты",icon:<img src={object} alt="Объекты"  style={{height:'34px', width:"34px"}}/>,url: "/admin/objects"},
    {text: "Путевые листы",icon:<img src={roadList} alt="Путевые листы"  style={{height:'34px', width:"34px"}}/> , url: '/admin/tracks'},
    {text: "Закреплённая техника",icon:<img src={markedTechnic} alt="Закреплённая техника"  style={{height:'34px', width:"36px"}}/>,url: "/admin/technics"},
    {text: "Список техники",icon:<img src={technic} alt="Техника"  style={{height:'34px', width:"36px"}}/>,url: "/admin/markedtechnic"},
    {text: "Справочная информация",icon:<img src={question} alt="Справочная информация"  style={{height:'40px', width:"40px"}}/> , url: '/admin'}
    
]



const Workers = () => {
    const [value, setValue] = useState<unknown>(null);
    const navigate = useNavigate();
    const [cookie, setCookie] = useState<string | null>(document.cookie);
    
    useEffect(() => {
        if(!cookie) {
            navigate('/auth')
        }
    }, [cookie])
    return (
        <div
        className="object">
            <Header onDataChange={() => {}}/>
            <LeftPanel buttons={buttons} cssChange={false}/>
            <div className="info">
                <label className="label">
                    Объекты
                </label>
            </div>
            <div className="table-container">
                <table
            className="table">
                    <thead>
                        <tr>
                            <th className="head fio">Пользователь</th>
                            <th className='head'>Должность</th>
                        </tr>
                    </thead>
                    <tbody>
                
                        <tr>
                            <td className="left_td">
                                Кленова Екатерина Михайловна
                            </td>
                            <td className="td">
                                Логист
                            </td>
                        </tr>
                        <tr>
                            <td className="left_td">
                                Образумов Артём Александрович
                            </td>
                            <td className="td">
                                Логист
                            </td>
                        </tr>
                        <tr>
                            <td className="left_td">
                                ГрачЁв Николай Романович
                            </td>
                            <td className="td">
                                Диспетчер
                            </td>
                        </tr>
                        <tr>
                            <td className="left_td">
                                Кивалин Никита Сергеевич
                            </td>
                            <td className="td">
                                Администратор
                            </td>
                        </tr>

                    </tbody>                    
                </table>
            </div>
        </div>
    )
}
export default Workers;