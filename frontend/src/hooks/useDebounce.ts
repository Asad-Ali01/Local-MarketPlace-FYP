import { useEffect, useState } from "react"

export function useDebounce<T>(value:T,delay:number):T {
    const [debounceValue,setDebounceValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
            console.log("Set debounce start");
        },delay);

        return () => {
            clearTimeout(timer);
            console.log("CLear timeout runs");
        }
    },[value,delay]);

    return debounceValue;

}

export default useDebounce