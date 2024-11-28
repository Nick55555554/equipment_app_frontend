import { SetStateAction, useEffect, useRef, useState } from "react"
import "./input.css"
import { CiSearch } from "react-icons/ci";
import { url } from "../../../config";

interface inputProps{
    width: number;
    onDataChange: ((value: string) => void) | null;
}

const Input:React.FC<inputProps> = ({width, onDataChange }) => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const littleInputRef = useRef<HTMLInputElement | null>(null);
    useEffect(()=>{
        if(inputRef.current && littleInputRef.current){
            inputRef.current.style.width = `${width}%`;
        }
    },[])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value && onDataChange){
            onDataChange(e.target.value); 
        }

    }



    return (
        <div
        className="border"
        ref={inputRef}
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