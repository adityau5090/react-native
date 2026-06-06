import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocationTracking() {
const [location, setLocation] = useState({latitude: 0,longitude: 0});
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    async function start() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (
        status !== "granted"
      )
        return;

      subscription =
        await Location.watchPositionAsync(
  {
    accuracy:
      Location.Accuracy.BestForNavigation,

    timeInterval: 1000,

    distanceInterval: 1,
  },
  (position) => {
    setLocation({
      latitude:
        position.coords.latitude,

      longitude:
        position.coords.longitude,
    });

    setSpeed(
      position.coords.speed ?? 0
    );
  }
);
    }

    start();

    return () => {
      subscription?.remove();
    };
  }, []);

  return {speed, location};
}