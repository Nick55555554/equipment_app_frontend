import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null); 
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setError(null);
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Couldn't fetch this data");
                }
                const newData = await res.json();
                setData(newData);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsPending(false); 
            }
        };

        fetchData();
    }, [url]);
    
    return { data, isPending, error };
};
