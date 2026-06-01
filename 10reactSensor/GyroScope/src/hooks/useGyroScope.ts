import { Gyroscope } from "expo-sensors"
import { useState, useEffect } from "react"

export function useGyroScope(){
    const [available, setAvailable] = useState<boolean | null>(null)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)

    useEffect(() => {
        let subsription : {remove:()=>void} | undefined;

        (async ()=> {
            const isAvailable = await Gyroscope.isAvailableAsync();
            setAvailable(isAvailable)

            if(!isAvailable) return;

            Gyroscope.setUpdateInterval(20)

            subsription = Gyroscope.addListener((data) => {  //subscribing
                setX(data.x)
                setY(data.y)
                setZ(data.z)
            })
        })()

        return ()=>subsription?.remove()
    }, [])

    return {available, x, y, z};
}