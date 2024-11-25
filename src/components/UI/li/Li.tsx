import { MouseEventHandler, useEffect, useRef } from "react";
import "./li.css"
import { useNavigate } from "react-router";
export interface liProps{
    text: string;
    icon: React.ReactNode;
    url: string;
    last?: boolean;
}
    
const Li:React.FC<liProps> = ({text, icon, url,last }) => {
    const liRef = useRef<HTMLDivElement| null>(null)
    const navigate = useNavigate();
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        navigate(url);
    }

    return (
        <div className={`li ${last ? 'last-item' : ''}`}
        onClick={handleClick}
        ref={liRef}
        >
            {icon}
            <span
            className={`littleLi ${last ? 'last-littleItem' : ''}`}>
                {text}
            </span>

        </div>
    )
}
export default Li;