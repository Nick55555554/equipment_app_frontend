import { useState } from "react";
import Header from "../../../../components/Ordinary/header";
import LeftPanel from "../../../../components/Ordinary/leftPanel";
import { buttons } from "../../config/utils";
import { formatDataDate } from "../../../logist/config/utils";
import "./roadlist.css"

const LockedRoadList = ({number}: {number: string}) => {
    const [technic, setTechnic] = useState<string | null>(null);



    return (
        <div
        className="roadList">
        <Header  onDataChange={setTechnic}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoRoadList">
                <label className="label"> Путевой лист №{number}</label>
                <div 
                    className="bigAnalytishForRoadList">
                    </div>
                    <div 
                    className="bigAnalytishForRoadList">
                        <div className="heighWeightLIST">Дата:<span className="lowWeight">{}</span></div>
                        <div className="heighWeightLIST">Вид:<span className="lowWeight">{}</span></div>
                        <div className="heighWeightLIST">Тип:<span className="lowWeight">{}</span></div>
                        <div className="heighWeightLIST">Марка машины:<span className="lowWeight">{}</span></div>
                        <div className="heighWeightLIST">Марка горючего:<span className="lowWeight">{}</span></div>
                        <div className="heighWeightLIST">Номер:<span className="lowWeight">{}</span></div>
                        <div className="heighWeightLIST">ФИО водителя:<span className="lowWeight">{}</span></div>
                    </div>

                    
                    <label className="label">Маршрут</label>

                
                <div className="veryBigAnalytishForRoadList">
                        <div className="heighWeightLIST">Адрес объекта:<span className="lowWeight">{formatDataDate('1342')}</span></div>
                        <div className="heighWeightLIST">Расстояние:<span className="lowWeight">{}</span></div>
                        <label className="heighWeightLIST">Плановые данные</label>
                        <div className="dannie">
                                <div className="bukvi">Время выезда</div>
                                <div className="bukvi">Время прибытия</div>
                                <div className="bukvi">Время работы</div>
                            </div>
                        <div className="dannieButton">
                            <div className="notInputList">9:00</div>
                            <div className="notInputList">10:00</div>
                            <div className="notInputList">34</div>
                        </div> 
                        <label className="heighWeightLIST">Фактические данные</label> 
                        <div className="dannieTwo">
                                <div className="bukviTwo">Время выезда</div>
                                <div className="bukviTwo">Время прибытия</div>
                            </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo"></input>
                            <input className="inputListonlyTwo"></input>
                        </div> 
                        <div className="dannieTwo">
                                <div className="bukviTwo">Время работы</div>
                                <div className="bukviTwo">Время ожидания</div>
                            </div>
                        <div className="dannieButton">
                            <input className="notInputListTwo"></input>
                            <input className="notInputListTwo"></input>
                        </div> 
                        <div className=" out">Показания одометра</div>
                        <div className="dannieTwo">
                                <div className="bukviTwo">При выезде</div>
                                <div className="bukviTwo">По возвращении</div>
                            </div>
                        <div className="dannieButton">
                            <input className="notInputListTwo"></input>
                            <input className="notInputListTwo"></input>
                        </div> 
                        <div className=" out">Остаток топлива</div>
                        <div className="dannieTwo">
                            <div className="bukviTwo">При выезде</div>
                            <div className="bukviTwo">По возвращении</div>
                            </div>
                        <div className="dannieButton">
                            <input className="notInputListTwo"></input>
                            <input className="notInputListTwo"></input>
                        </div> 
                    </div>
                <label className="label">Маршрут</label>
                <div
                className="verysmallAnalytishForRoadList">
                    <div className="middleWeightLIST">Топливо ({}):<span className="lowWeight">{}</span></div>
                    <div className="middleWeightLIST">Оплата труда ({}):<span className="lowWeight">{}</span></div>
                    <div className="heighWeightLIST">Итого:<span className="lowWeight">{}</span></div>
                    </div>
            </div>
    </div>
    )
}
export default LockedRoadList;
