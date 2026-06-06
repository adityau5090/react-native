import { Gyroscope } from 'expo-sensors'
import { useEffect, useState } from 'react'

export function useGyroscopeSensor(){
    const [available, setAvailable] = useState<boolean | null>(null)
    const [data, setData] = useState({x:0, y:0, z:0})

    useEffect(() => {
        let subscription: {remove: ()=>void} | undefined

        (async() => {
            const isAvailable = await Gyroscope.isAvailableAsync()
            setAvailable(isAvailable)

            if(!isAvailable) return;

            Gyroscope.setUpdateInterval(100);

            subscription = Gyroscope.addListener((data) => {
                setData(data)
            })

        })()

        return () => subscription?.remove()
    }, [])

    return {available, data}
}