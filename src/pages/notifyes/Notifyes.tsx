import Header from "../../components/Ordinary/header"
import LeftPanel from "../../components/Ordinary/leftPanel"
import "./notifyes.css"
import { buttons } from "../logist/config/utils"
import { useState } from "react"
import clock from "../../images/clock.png";

interface NotifyesProps{
    id: number;
    date: string;
    number: number;
}

const Notifyes = () => {
    const [notifies, setNotifies] = useState<NotifyesProps | null>(null);

    const getNotifies = (notifies: NotifyesProps[]) => {
        return(
            <div></div>
        )
    }

    return(
        <div
        className="notifyes">
            <Header  onDataChange={null}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="dataNotify">
                <label className="label">
                    Уведомления
                </label>
                <div className="infonotify">
                    <div className="divForGap">
                        
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                       
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                       
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                       
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                        <div className="notify">
                            <div className="clock"><img src={clock} style={{width:"34px", height: "34px"}}></img></div>

                            <div className="oneNotifyData">
                                <div className="dateTime">Время</div>
                                <div className="labelNotify">
                                Новая заявка</div>
                                <div className="numberNotify">Создана заявка №21321</div>
                            </div>
                        </div>
                       


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Notifyes;