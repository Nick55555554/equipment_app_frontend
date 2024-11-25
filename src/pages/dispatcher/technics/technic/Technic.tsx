import Header from "../../../../components/Ordinary/header/index"
import LeftPanel from "../../../../components/Ordinary/leftPanel/index"
import React, { useEffect, useRef, useState } from "react"
import { buttons, months } from "../../config/utils"
import "./technic.css"
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

interface technicProps{
    number: string;
}

const Technic:React.FC<technicProps> = ({number}) => {
    const [technic, setTechnic] = useState<technicProps | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null); 
    const canvasRef1 = useRef<HTMLCanvasElement | null>(null); 
    const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
    const canvasRef3 = useRef<HTMLCanvasElement | null>(null);

    const [lineChartData1, setLineChartData1] = useState<ChartData<'bar'>>({
        labels: months,
        datasets: [
            {
                label: 'Активная',
                data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56 ],
                backgroundColor: 'rgba(213, 218, 198, 1)', 
                borderColor: 'rgb(213, 218, 198)',
                borderWidth: 1,
            },
            {
                label: 'Простаивающая',
                data: [35, 41, 20, 19, 44, 45, 60,65, 59, 80, 81], 
                backgroundColor: 'rgba(255, 99, 132, 0.5)', 
                borderColor: 'rgba(255, 99, 132, 1)',
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
        
    
    return(
        <div
        className="technic">
        <Header urlToBD="/workplaces" onDataChange={setTechnic}/>
            <LeftPanel buttons={buttons} cssChange={true}/>
            <div className="infoTechnic">
                <label className="label3">
                    Техника №{number}
                </label>
                <div className="infoTechnic2">
                    <div className="heighWeight">Статус на данный момент:<span className="lowWeight">папа</span></div>
                    <div className="heighWeight">Объект работы:<span className="lowWeight">папа</span></div>
                    <div className="heighWeight">Плановое время окончания работы:<span className="lowWeight">папа</span>
                    </div>  
                </div>
                <label className="label3">
                    Расписание
                </label>
                <div className="agenda">
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
                    <div className="bigAnalytish white">
                        <label className="label3">
                                Активность за год
                        </label>
                        <canvas className="lineChart" ref={canvasRef2} />
                    </div>
                    <div className="bigAnalytish white">
                        <label className="label3">
                                Поломки за год
                        </label>
                        <canvas className="lineChart" ref={canvasRef3} />
                    </div>
                    <div className="bigAnalytish white">
                        <label className="label3">
                                Оценки состояния техники
                        </label>
                        <div className="IIText"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum assumenda est fugiat consequatur quae hic ea, laudantium, in, maiores eligendi eaque totam consequuntur nobis rem porro at suscipit veniam tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus ipsa in tenetur itaque est quis fugiat. Explicabo, totam consectetur. Minima illo, natus animi qui neque debitis deserunt aliquam non repudiandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis at iste dolorem quos quae. Beatae, optio molestias corporis provident facere unde sit nam porro omnis vitae eveniet repudiandae similique asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi iusto minima quibusdam rem. Ad dolore itaque omnis! Rerum ipsa iusto necessitatibus doloremque asperiores ratione. Ad nihil esse illum officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit quod ratione, sunt obcaecati quaerat dolores provident eligendi nemo nam veniam repellendus nihil porro sed eum dicta repudiandae mollitia odio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nam minima ea vitae recusandae, provident dignissimos cumque ullam deserunt natus minus fuga aliquam praesentium dolor alias ducimus eius molestias omnis?</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Technic;