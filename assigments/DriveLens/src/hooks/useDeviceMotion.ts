import { DeviceMotion } from "expo-sensors";
import { useEffect, useState } from "react";

export function useDeviceMotion(){
    const [available, setAvailable] = useState<boolean | null>(null)
    const [data, setData] = useState({})

    useEffect(() => {
        let subscription : {remove: ()=>void} | undefined;

        (async() => {
            const isAvailable = await DeviceMotion.isAvailableAsync();
            setAvailable(isAvailable)

            if(!isAvailable) return;

            DeviceMotion.getPermissionsAsync()
            DeviceMotion.setUpdateInterval(2000)

            subscription = DeviceMotion.addListener((data) => {
                setData(data)
            })
        })()

        return ()=> subscription?.remove()
    }, [])

    return { available, data }
}








