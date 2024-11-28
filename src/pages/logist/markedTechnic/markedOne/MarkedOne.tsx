import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useEffect, useRef, useState } from "react"
import { buttons, months } from "../../config/utils"
import "./markedOne.css"
import { Chart, ChartData, registerables } from 'chart.js';
import { url } from "../../../../config"
import { SmallTable } from "../../technics/technic/SmallTable"

Chart.register(...registerables);

interface equipmentType{
    id: number;
    name: string;
    image: string;
}

export interface equipmentTypeResponsesTypes{
    id: number;
    type: string;
    equipment: equipmentType;
}

export interface unitType{
    id:number;
    address: string;
    latitude: number;
    longitude: number;
}

export interface baseType{
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
}
interface TechnicProps{
    number: string;
}

const MarkedOne:React.FC<TechnicProps> = ({number}) => {
    const [technic, setTechnic] = useState<markedTechnicTypes | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null); 
    const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

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




    const [doughnutChartData, setDoughnutChartData] = useState<ChartData<'doughnut'>>({
        labels: ['КАМАЗ', 'Мерс'],
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
                            position: 'right',
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

        setIsPending(true)
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

    },[])
        
    
    return(
        <div
        className="markedtechnic">
        <Header  onDataChange={null}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoTechnicMark">

            <label className="label3first">
                    {technic?.equipmentType.equipment.name} <div className="inline"> {technic?.equipmentType.type} </div>
                </label>
                <div className="bigAnalytishMarkfirst">
                        <div className="smallAnalytishMarkBig">
                            <label className="label3 ">Марки машин
                            </label>
                            <div className="divdoughutChartmark"><canvas className="doughutChartmark" ref={canvasRef} />
                            </div>
                            
                        </div>
                        <div className="smallAnalytishMark">
                            <img className="centerIMG" src={`${technic?.equipmentType.equipment.image}`}></img>
                        </div>
                    </div>
                    <SmallTable/>
                    <div className="bigAnalytish white">
            <label className=" left_labelM">
                    Активность по виду за год
            </label>
            <canvas className="lineChart" ref={canvasRef2} />
                </div>
        </div>
    </div>
    
    )
}
export default MarkedOne;