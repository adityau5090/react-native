import { useEffect, useRef } from 'react';
import {
  Accelerometer,
  Gyroscope,
  DeviceMotion
} from 'expo-sensors';

export function useSensorDetection(onEvent: any) {
  const lastOrient = useRef(0);
  const cooldown  = useRef<any>({});

  function emit(type : any, penalty: any) {
    const now = Date.now();
    if (now - (cooldown.current[type]||0) < 2000)
      return;             // 2s cooldown per event
    cooldown.current[type] = now;
    onEvent({ type, penalty, time: now });
  }

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const accelSub = Accelerometer.addListener(
      ({ x }) => {
        if (x < -1.5) emit('brake', 5);
        if (x >  1.5) emit('accel', 5);
      }
    );

    Gyroscope.setUpdateInterval(100);
    const gyroSub = Gyroscope.addListener(
      ({ z }) => {
        if (Math.abs(z) > 1.2)
          emit('turn', 5);
      }
    );

    DeviceMotion.setUpdateInterval(200);
    const motionSub = DeviceMotion.addListener(
      ({ orientation }) => {
        const delta = Math.abs(
          orientation - lastOrient.current
        );
        if (delta > 45) emit('phone', 10);
        lastOrient.current = orientation;
      }
    );
    return () => {
      accelSub.remove();
      gyroSub.remove();                               
      motionSub.remove();
    };
  }, []);
}