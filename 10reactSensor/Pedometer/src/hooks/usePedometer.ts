import { Pedometer } from "expo-sensors"
import { useEffect, useState } from "react"
import { registerCustomSerializable } from "react-native-worklets"

export function usePedometer(){
    const [available, setAvailable] = useState<boolean | null>(null)

    useEffect(()=> {
        let subscription : {remove : ()=> void} | undefined

        (async() => {
            const isAvailable = await Pedometer.isAvailableAsync()
            console.log("IsAvailabe : ", isAvailable)
            setAvailable(isAvailable)

            if(!isAvailable) return;

            const subscription = Pedometer.watchStepCount((result) => {
                console.log("Steps : ", result)
            })

        })()

        return () => subscription?.remove()
    }, [])
}