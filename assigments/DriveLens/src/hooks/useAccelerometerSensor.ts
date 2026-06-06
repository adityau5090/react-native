import { Accelerometer } from 'expo-sensors'
import { useEffect, useState } from 'react'

export function useAccelerometerSensor(){
    const [available, setAvailable] = useState<boolean | null>(null)
    const [data, setData] = useState({x:0, y:0, z:0})

    useEffect(() => {
        let subscription: {remove: ()=>void} | undefined

        (async() => {
            const isAvailable = await Accelerometer.isAvailableAsync()
            setAvailable(isAvailable)

            if(!isAvailable) return;

            Accelerometer.setUpdateInterval(100);

            subscription = Accelerometer.addListener((data) => {
                setData(data)
            })

        })()

        return () => subscription?.remove()
    }, [])

    return {available, data}
}