import { useEffect, useRef, useState } from "react";
import Header from "../../../../components/Ordinary/header";
import LeftPanel from "../../../../components/Ordinary/leftPanel";
import { buttons } from "../../config/utils";
import { formatData, formatDataDate, timeToISO } from "../../../logist/config/utils";
import "./roadlist.css"
import { url } from "../../../../config";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import point from "./../../../../images/point.png"
import outpoint from "./../../../../images/outPoint.png"
import { useNavigate } from "react-router";
import excel from "../../../../images/excel.png"

interface Unit {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
}

interface Base {
    id: number;
    unit: Unit;
    address: string;
    latitude: number;
    longitude: number;
}

interface Equipment {
    id: number;
    name: string;
    image: string;
}

interface EquipmentType {
    id: number;
    type: string;
    equipment: Equipment;
}

interface NamedEquipment {
    id: number;
    licensePlate: string;
    carBrand: string;
    base: Base;
    fuelType: string;
    equipmentType: EquipmentType;
}

interface ArrivalPoint {
    id: number;
    address: string;
    planOutTime: string; // ISO 8601 date string
    planArrivalTime: string; // ISO 8601 date string
    distanse: number; // исправлено с "distanse" на "distance"
    planWorkDuration: number; // в секундах
}

interface YourDataType {
    id: number;
    date: string; // ISO 8601 date string
    namedEquipment: NamedEquipment;
    driver: null | string; // предполагается, что driver может быть строкой или null
    isActive: boolean;
    arrivalPoints: ArrivalPoint[];
}

const RoadList = ({number}: {number: string}) => {
    const [list, setList] = useState<YourDataType | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [FIO, setFIO] = useState<string>('');
    const [cost, setCost] = useState<string>('')
    const [timeGo, setTimego] = useState<string>('')
    const [timeout, setTimeout] = useState<string>('')
    const [timeWork, setTimeWork] = useState<string>('')
    const [timeWait, setTimeWait] = useState<string>('')
    const [odometrGo, setOdometrgo] = useState<string>('')
    const [odometrOut, setOdometrOut] = useState<string>('')
    const [fullgo, setFullgo] = useState<string>('')
    const [fullout, setFulout] = useState<string>('')
    const mapRef = useRef<HTMLDivElement| null>(null);
    const navigate = useNavigate();

    const mapRefInstance = useRef<Map | null>(null); 
    useEffect(() => {
        if (!mapRef.current) return;
    
        // Создание слоя карты
        const tileLayer = new TileLayer({
            source: new OSM(),
        });
    
        // Создание карты
        const map = new Map({
            target: mapRef.current,
            layers: [tileLayer],
            view: new View({
                center: fromLonLat([37.6173, 55.7558]), // Координаты центра карты (долгота, широта)
                zoom: 11, // Уровень масштабирования
            }),
        });
        mapRefInstance.current = map; // Сохраняем экземпляр карты
    
        
    
        // Очистка карты при размонтировании компонента
        return () => map.setTarget(undefined);
    }, []);
    

    const addMarkers = (coordinates: {lon: number, lat: number}[]) => {
        const markers = coordinates.map(({lon, lat}, index) => {
            return new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
            });
        });
    
        const vectorSource = new VectorSource({
            features: markers,
        });
        const markerStyle = new Style({
            image: new Icon({
                src: point,
                scale: 0.05, // Уменьшение размера иконки
            }),
        });
        
        const markerStyleOut = new Style({
            image: new Icon({
                src: outpoint,
                scale: 0.05, // Уменьшение размера иконки
            }),
        });
        
    
        // Создаем слой для маркеров
        const markerLayer = new VectorLayer({
            source: vectorSource,
            style: (feature, resolution) => {
                const index = markers.indexOf(feature as Feature<Point>);
                return index === 0 ? markerStyleOut : markerStyle; // Применяем markerStyleOut для первого маркера
            },
        });
    
        // Добавляем слой маркеров на карту
        if (mapRefInstance.current) {
            mapRefInstance.current.addLayer(markerLayer);
        }
    };
    const handleClicker = async () => {
        setIsPending(true); // Устанавливаем состояние ожидания
    
        const token = document.cookie.split('=')[1]; // Получаем токен из cookie
    
        // Собираем данные для отправки
        const dataToSend = list?.arrivalPoints.map((point, index) => ({
            id: point.id,
            realArrivalTime: timeToISO(timeout), // Время прибытия, введенное пользователем
            realOutTime: timeToISO(timeGo), // Время выезда, введенное пользователем
            kmOnStart: parseInt(odometrGo), // Показания одометра при выезде
            kmOnEnd: parseInt(odometrOut), // Показания одометра по возвращении
            fuelOnStart: parseInt(fullgo), // Остаток топлива при выезде
            fuelOnEnd: parseInt(fullout), // Остаток топлива по возвращении
            waitTime: timeToISO(timeWait), // Время ожидания, введенное пользователем
            driver: FIO, // ФИО водителя, введенное пользователем
            price: parseInt(cost),
        })) || [];
        const requestOptions: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        };
    
        try {
            const response = await fetch(`${url}/track/${number}/real_data`, requestOptions);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error: ${errorText}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log("Response from server:", responseData);
        } catch (error) {
            console.error("Fetch error:", error);
        }

        navigate('/dispatcher')
        
    };
    
    
    
    useEffect(() => {
        setIsPending(true);
        const token = document.cookie.split('=')[1]
        const fetchData = async () => {
            const requestOption: RequestInit  = {   
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`,
                    
                }
            }
            try {
                const response = await fetch(`${url}/track/${number}`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: YourDataType = await response.json();
                console.log(responseData)
                setList(responseData);
                setIsPending(false);
                if (responseData) {
                    const coordinates = [
                        { lon: responseData.namedEquipment.base.longitude, lat: responseData.namedEquipment.base.latitude },
                        // Добавьте другие точки, если нужно
                    ];
                    addMarkers(coordinates);
                }
    
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        fetchData();
    }, [])





    return (
        <div
        className="roadList">
        <Header  onDataChange={() => {}}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoRoadList">
                <label className="label"> Путевой лист №{number}</label>
                <img  className='excel' src={excel} alt="Excel-File" style={{width: "26px", height: "26px"}} />
                <div ref={mapRef}
                    className="bigAnalytishForRoadList">
                    </div>
                    <div 
                    className="very05BigAnalytishForRoadList">
                        <div className="heighWeightLIST">Дата:<span className="lowWeight">{formatDataDate(list?.date)}</span></div>
                        <div className="heighWeightLIST">Вид:<span className="lowWeight">{list?.namedEquipment.equipmentType.equipment.name}</span></div>
                        <div className="heighWeightLIST">Тип:<span className="lowWeight">{list?.namedEquipment.equipmentType.type}</span></div>
                        <div className="heighWeightLIST">Марка машины:<span className="lowWeight">{list?.namedEquipment.carBrand}</span></div>
                        <div className="heighWeightLIST">Марка горючего:<span className="lowWeight">{list?.namedEquipment.fuelType}</span></div>
                        <div className="heighWeightLIST">Номер:<span className="lowWeight">{0}</span></div>
                        <div className="heighWeightLIST">ФИО водителя:</div>
                        <input className="inputListonlyOne"onChange={(e) =>{setFIO(e.target.value)} }></input>
                        <div className="heighWeightLIST">Стоимость часа работ:</div>
                        <input className="inputListonlyOne"onChange={(e) =>{setCost(e.target.value)} }></input>
                    </div>

                    
                    <label className="label">Маршрут</label>

                
                {list?.arrivalPoints.map((point, index) => (
                    <div className="veryBigAnalytishForRoadList" key={index}>
                        <div className="heighWeightHELPFIRST">Адрес объекта:<span className="lowWeight">{point.address}</span></div>
                        <div className="heighWeightLIST">Расстояние:<span className="lowWeight">{point.distanse}</span></div>
                        <label className="heighWeightLIST">Плановые данные</label>
                        <div className="dannie">
                            <div className="bukvi">Время выезда</div>
                            <div className="bukvi">Время прибытия</div>
                            <div className="bukvi">Время работы</div>
                        </div>
                        <div className="dannieButton">
                            <div className="notInputList">{formatData(point.planArrivalTime)}</div>
                            <div className="notInputList">{formatData(point.planOutTime)}</div>
                            <div className="notInputList">{point.planWorkDuration}</div>
                        </div>
                        <label className="heighWeightLIST">Фактические данные</label>
                        <div className="dannieTwo">
                            <div className="bukviTwo">Время выезда</div>
                            <div className="bukviTwo">Время прибытия</div>
                        </div>
                        <div className="dannieButton">
                            <input className="inputListonlyTwo" onChange={(e) => { setTimego(e.target.value) }} />
                            <input className="inputListonlyTwo" onChange={(e) => { setTimeout(e.target.value) }} />
                        </div>
                        <div className="dannieTwo">
                            <div className="bukviTwo">Время работы</div>
                            <div className="bukviTwo">Время ожидания</div>
                        </div>
                        <div className="dannieButton">
                            <input onChange={(e) => { setTimeout(e.target.value) }} className="inputListonlyTwo" />
                            <input onChange={(e) => { setTimeWait(e.target.value) }} className="inputListonlyTwo" />
                        </div>
                        <div className="out">Показания одометра</div>
                        <div className="dannieTwo">
                            <div className="bukviTwo">При выезде</div>
                            <div className="bukviTwo">По возвращении</div>
                        </div>
                        <div className="dannieButton">
                            <input onChange={(e) => { setOdometrgo(e.target.value) }} className="inputListonlyTwo" />
                            <input onChange={(e) => { setOdometrOut(e.target.value) }} className="inputListonlyTwo" />
                        </div>
                        <div className="out">Остаток топлива</div>
                        <div className="dannieTwo">
                            <div className="bukviTwo">При выезде</div>
                            <div className="bukviTwo">По возвращении</div>
                        </div>
                        <div className="dannieButton">
                            <input onChange={(e) => { setFullgo(e.target.value) }} className="inputListonlyTwo" />
                            <input onChange={(e) => { setFulout(e.target.value) }} className="inputListonlyTwo" />
                        </div>
                    </div>
                ))}
            <button className="sendLists" onClick={handleClicker}>Закрыть путевой лист</button>

    
        </div>
    </div>
    )
}
export default RoadList;