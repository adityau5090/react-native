import { Accelerometer } from "expo-sensors"
import { useState, useEffect } from "react"

export function useAccelerometer(){
    const [available, setAvailable] = useState<boolean | null>(null)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)

    useEffect(() => {
        let subsription : {remove:()=>void} | undefined;

        (async ()=> {
            const isAvailable = await Accelerometer.isAvailableAsync();
            setAvailable(isAvailable)

            if(!isAvailable) return;

            Accelerometer.setUpdateInterval(100)

            subsription = Accelerometer.addListener((data) => {  //subscribing
                setX(data.x)
                setY(data.y)
                setZ(data.z)
            })
        })()

        return ()=>subsription?.remove()
    }, [])

    return {available, x, y, z};
}