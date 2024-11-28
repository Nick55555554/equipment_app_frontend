import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useEffect, useRef, useState } from "react"
import { buttons, formatData, months } from "../../config/utils"
import "./technic.css"
import { Chart, ChartData, registerables } from 'chart.js';
import { url } from "../../../../config"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

Chart.register(...registerables);

interface equipmentType{
    id: number;
    name: string;
    image: string;
}

interface equipmentTypeResponsesTypes{
    id: number;
    type: string;
    equipment: equipmentType;
}

interface unitType{
    id:number;
    address: string;
    latitude: number;
    longitude: number;
}

interface baseType{
    id: number;
    unit: unitType
    address: string;
    latitude: number;
    longitude: number;
}

interface markedTechnicTypes{
    id: number;
    licensePlate:string;
    carBrand: string;
    base: baseType;
    equipmentType: equipmentTypeResponsesTypes;
    isActive: boolean,
    lastWorkPlaceAddress: string,
    finishTime: string
    lastWorkplaceAddress: string;
}
interface TechnicProps{
    number: string;
}

const Technic:React.FC<TechnicProps> = ({number}) => {

    const [technic, setTechnic] = useState<markedTechnicTypes | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null); 
    const canvasRef1 = useRef<HTMLCanvasElement | null>(null); 
    const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
    const canvasRef3 = useRef<HTMLCanvasElement | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date());
    const [deals, setDeals] = useState<string[]>([]);

    const [lineChartData1, setLineChartData1] = useState<ChartData<'bar'>>({
        labels: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
        datasets: [
            {
                label: 'Активная',
                data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56 ],
                backgroundColor: 'rgb(174, 179, 159)', 
                borderColor: 'rgb(174, 179, 159)',
                borderWidth: 1,
            },
            {
                label: 'Простаивающая',
                data: [35, 41, 20, 19, 44, 45, 60,65, 59, 80, 81], 
                backgroundColor: 'rgb(213, 218, 198)', 
                borderColor: 'rgb(213, 218, 198)',
                borderWidth: 1,
            },
        ]
    });
    const [lineChartData2, setLineChartData2] = useState<ChartData<'line'>>({
        labels: months.slice(0, 7),
        datasets: [{
            label: 'Показатели',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(213, 218, 198)',
            tension: 0.1
        }]
    });

    const [lineChartData3, setLineChartData3] = useState<ChartData<'line'>>({
        labels: months.slice(0, 7), 
        datasets: [{
            label: 'Показатели',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(213, 218, 198)',
            tension: 0.1
        }]
    });



    const [doughnutChartData, setDoughnutChartData] = useState<ChartData<'doughnut'>>({
        labels: ['Активная', 'Простаивающая'],
        datasets: [{
            data: [300, 100],
            backgroundColor: [
                'rgb(174, 179, 159)',
                'rgb(213, 218, 198)',
            ],
            hoverOffset: 4
        }]
    });

    const commonOptions = {
        responsive: true,
        scales: {
        }
    };

    useEffect(() => {
        const ctx = canvasRef1.current?.getContext('2d');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: lineChartData1,
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                font: {
                                    size: 16,
                                },
                                color: 'black',
                            }
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                        }
                }
            });
    
            return () => {
                chart.destroy();
            };
        }
    }, [lineChartData1]);
    useEffect(() => {
        const ctx = canvasRef2.current?.getContext('2d');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'line',
                data: lineChartData2,
                options: commonOptions
            });

            return () => {
                chart.destroy();
            };
        }
    }, [lineChartData2]); 
    useEffect(() => {
        const ctx = canvasRef3.current?.getContext('2d');
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'line',
                data: lineChartData3,
                options: commonOptions
            });

            return () => {
                chart.destroy();
            };
        }
    }, [lineChartData3]); 

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        let myChart: Chart | null = null;

        if (ctx) {
            myChart = new Chart(ctx, {
                type: 'doughnut',
                data: doughnutChartData,
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                font: {
                                    size: 16,
                                },
                                color: 'black',
                            }
                        }
                    },
                    responsive: true,
                    }
            });
        }
        return () => {
            myChart?.destroy();
        };
    }, [doughnutChartData]); 

    useEffect(() => {
        const dataFetch = async () => {
            const token = document.cookie.split('=')[1]
            const requestOption: RequestInit  = {
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`
                    
                }
            }
            try {
                const response = await fetch(`${url}/named_equipment/${number}`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: string[] = await response.json();
                console.log("Response data:", responseData);
                setDeals(responseData);
                setIsPending(false);
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        dataFetch();
    },[value])
    
    useEffect(() =>{
        const dataFetch = async () => {
            const token = document.cookie.split('=')[1]
            const requestOption: RequestInit  = {
                method: "GET",
                headers: {
                    "Content-type": 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": `Bearer ${token}`
                    
                }
            }
            try {
                const response = await fetch(`${url}/kalendar/${value}`, requestOption)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const responseData: markedTechnicTypes = await response.json();
                console.log("Response data:", responseData);
                setTechnic(responseData);
                setIsPending(false);
            } catch(error) {
                console.log("Fetch error:", error);
                setIsPending(false)
            }
        }
        dataFetch();
    })
    
    return(
        <div
        className="technicTrue">
        <Header  onDataChange={null}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoTechnic">
                <label className="label3">
                    <div>{technic?.equipmentType.equipment.name}</div><div className="inline">{technic?.equipmentType?.type} </div ><div className="inline">{technic?.licensePlate}</div>
                </label>
                <div className="infoTechnic2">
                    <div className="heighWeight">Статус на данный момент:
                    {technic?.isActive ? <span className="lowWeight">задействованна</span>
                    : <span className="lowWeight">простаивает</span>}</div>
                    <div className="heighWeight">Объект работы:<span className="lowWeight">{technic?.lastWorkplaceAddress}</span></div>
                    <div className="heighWeight">Плановое время окончания работы:<span className="lowWeight">{formatData(technic?.finishTime)}</span>
                    </div>  
                </div>
                <label className="label3">
                            Расписание
                        </label>
                <div className=" bigAnalytish agenda withLabel white">
                    <div className="smallAnalytish smallDate">
                        <label className="left_label label3 special">20.01.2024</label>
                        <ul className="analytish_Ul">
                            {
                                deals.length > 0 && deals.map((deal) => (
                                    <li className="analytish_Li">deal</li>
                                ))}
                        </ul>
                    </div>
                    <Calendar className="kalendar" onChange={onChange} value={value}/>
                </div>
                <label className="label3">
                    Аналитика
                </label>
                <div>
                    <div className="bigAnalytish">
                        <div className="smallAnalytish">
                            <label className="label3">
                                Активность
                            </label>
                            <canvas className="doughutChart" ref={canvasRef} />
                        </div>
                        <div className="smallAnalytish">
                        <label className="label3">
                                Активность за неделю
                            </label>
                            <canvas className="barChart" ref={canvasRef1} />
                        </div>
                    </div>
                    <div className="bigAnalytish white withLabel">
                        <label className="label3 left_label">
                                Активность за год
                        </label>
                        <canvas className="lineChart" ref={canvasRef2} />
                    </div>
                    <div className="bigAnalytish white withLabel">
                        <label className="label3 left_label" >
                                Поломки за год
                        </label>
                        <canvas className="lineChart" ref={canvasRef3} />
                    </div>
                    <div className="bigAnalytish white II">
                        <label className="label3 labelII ">
                                Оценка состояния техники<div className="inline">Cгнерировано ИИ</div>
                        </label>
                        <div className="IIText"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum assumenda est fugiat consequatur quae hic ea, laudantium, in, maiores eligendi eaque totam consequuntur nobis rem porro at suscipit veniam tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ipsa in tenetur itaque est quis fugiat. Explicabo, totam consectetur. Minima illo, natus animi qui neque debitis deserunt aliquam non repudiandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis at iste dolorem quos quae. Beatae, optio molestias corporis provident facere unde sit nam porro omnis vitae eveniet repudiandae similique asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi iusto minima quibusdam rem. Ad dolore itaque omnis! Rerum ipsa iusto necessitatibus doloremque asperiores ratione. Ad nihil esse illum officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit quod ratione, sunt obcaecati quaerat dolores provident eligendi nemo nam veniam repellendus nihil porro sed eum dicta repudiandae mollitia odio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nam minima ea vitae recusandae, provident dignissimos cumque ullam deserunt natus minus fuga aliquam praesentium dolor alias ducimus eius molestias omnis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique itaque non esse eaque necessitatibus, perferendis saepe quaerat? Perferendis nostrum alias odit dolores nihil quas! Autem maxime ea voluptates dolores iste? lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sunt rerum voluptas vel architecto necessitatibus rem! Perferendis itaque, delectus amet dolorum cumque vel voluptate repudiandae nemo ipsam facere dolore minima.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Technic;