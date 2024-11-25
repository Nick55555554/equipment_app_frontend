import { SetStateAction, useEffect, useRef, useState } from "react"
import "./input.css"
import { CiSearch } from "react-icons/ci";
import { url } from "../../../config";

interface inputProps{
    width: number;
    urlToBD: string;
    onDataChange: SetStateAction<any>;
}

const Input:React.FC<inputProps> = ({width, urlToBD, onDataChange }) => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const littleInputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<string>();
    useEffect(()=>{
        if(inputRef.current && littleInputRef.current){
            inputRef.current.style.width = `${width}%`;
        }
    },[])
    
    const anyClickHandler = (e: React.MouseEvent) => {
        if(inputRef.current && inputRef.current.contains(e.target as Node)) {
            littleInputRef.current?.focus();
        }
    }

    const onChangeHandler = async (e: any) => {
        setValue(e.target.value)

        const token = document.cookie.split("=")[1]
        const requestOption: RequestInit = {
            method: "GET",
            headers:{
                "Content-type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Authorization": `Bearer ${token}`
            }
        }
        try{
            const response = await fetch(`${url}/${urlToBD}`)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message ${errorText}`);
            }
            const responseData: unknown = await response.json();
            console.log("Response data:", responseData);
            onDataChange(responseData);
            
        } catch(error) {
            console.log("Fetch error:", error);
        }
    }

    return (
        <div
        className="border"
        ref={inputRef}
        onClick={anyClickHandler}
        >
            <CiSearch
            className="search" 
            size={24}/>
            <input
            ref={littleInputRef}
            className="input"
            onChange={onChangeHandler}
            placeholder="Поиск"
            >
            </input>
        </div>
    )
}
export default Input;