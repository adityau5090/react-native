import { LightSensor } from "expo-sensors"
import { useState, useEffect } from "react"
import { Platform } from "react-native"

export function useLightSensor(){
    const [available, setAvailable] = useState<boolean | null>(null)
    const [lux, setLux] = useState(0)

    useEffect(() => {

        if(Platform.OS !== "android") {
            setAvailable(false)
            return;
        }
        let subsription : {remove:()=>void} | undefined;

        (async ()=> {
            const isAvailable = await LightSensor.isAvailableAsync();
            setAvailable(isAvailable)

            if(!isAvailable) return;

            LightSensor.setUpdateInterval(100)

            subsription = LightSensor.addListener((data) => {  //subscribing
                setLux(data.illuminance) 
                console.log(data.illuminance)
            })
        })()

        return ()=>subsription?.remove()
    }, [])

    return {available, lux};
}