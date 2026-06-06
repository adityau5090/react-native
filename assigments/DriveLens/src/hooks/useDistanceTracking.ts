import {
  useEffect,
  useRef,
  useState,
} from "react";

import { calculateDistance } from "@/utils/calculateDistance";

type Props = {
  latitude: number;
  longitude: number;
};

export function useDistanceTracking({
  latitude,
  longitude,
}: Props) {
  const [
    distance,
    setDistance,
  ] = useState(0);

  const previous =
    useRef<{
      latitude: number;
      longitude: number;
    } | null>(null);

  useEffect(() => {
    if (
      latitude === 0 &&
      longitude === 0
    )
      return;

    if (!previous.current) {
      previous.current = {
        latitude,
        longitude,
      };

      return;
    }

    const segment =
      calculateDistance(
        previous.current.latitude,
        previous.current.longitude,
        latitude,
        longitude
      );

    setDistance(
      (prev) =>
        prev + segment
    );

    previous.current = {
      latitude,
      longitude,
    };
  }, [
    latitude,
    longitude,
  ]);

  return distance;
}