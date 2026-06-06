import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import {
  Colors,
  Spacing,
} from "@/theme";

import { DriveHeader } from "@/components/common/DriveHeader";
import { ScoreCard } from "@/components/cards/ScoreCard";
import { EventCounterCard } from "@/components/cards/EventCounterCard";
import { GradientButton } from "@/components/buttons/GradientButton";

import { useAccelerometerSensor } from "@/hooks/useAccelerometerSensor";
import { useGyroscopeSensor } from "@/hooks/useGyroscopeSensor";
import { useDriveStats } from "@/hooks/useDriveStats";
import { useDriveStore } from "@/store/driveStore";

import { magnitude } from "@/services/scoring/detection";

import { useEventCooldown } from "@/hooks/useEventCooldown";
import { useDeviceMovementDetection } from "@/hooks/useDeviceMovementDetector";
import { useSharpTurnDetection } from "@/hooks/useSharpTurnDetection";
import { usePhoneHandlingDetection } from "@/hooks/usePhoneHandlingDetection";
import { useAggressiveSteeringDetection } from "@/hooks/useAggressiveSteeringDetection";

import { useLocationTracking } from "@/hooks/useLocationTracking";
import { useDistanceTracking } from "@/hooks/useDistanceTracking";

import { useDriveTimer } from "@/hooks/useDriveTimer";
import { formatTime } from "@/utils/formatTime";

export default function ActiveDriveScreen() {
  const router = useRouter();

  const accelerometer =
    useAccelerometerSensor();

  const gyro =
    useGyroscopeSensor();

  const startDrive =
    useDriveStore(
      (s) => s.startDrive
    );

  const endDrive =
    useDriveStore(
      (s) => s.endDrive
    );

  const activeSession =
    useDriveStore(
      (s) => s.activeSession
    );

  const stats =
    useDriveStats();

  useEffect(() => {
    startDrive();
  }, [startDrive]);

  const currentMagnitude =
    magnitude(
      accelerometer.data.x,
      accelerometer.data.y,
      accelerometer.data.z
    );

  const movementCooldown =
    useEventCooldown(2000);

  const turnCooldown =
    useEventCooldown(3000);

  const phoneCooldown =
    useEventCooldown(3000);

  const steeringCooldown =
    useEventCooldown(4000);

  useDeviceMovementDetection({
    magnitude:
      currentMagnitude,

    canTrigger:
      movementCooldown.canTrigger,

    enabled:
      !!activeSession,
  });

  useSharpTurnDetection({
    rotationZ:
      gyro.data.z,

    canTrigger:
      turnCooldown.canTrigger,

    enabled:
      !!activeSession,
  });

  usePhoneHandlingDetection({
    magnitude:
      currentMagnitude,

    rotationZ:
      gyro.data.z,

    canTrigger:
      phoneCooldown.canTrigger,

    enabled:
      !!activeSession,
  });

  useAggressiveSteeringDetection({
    rotationZ:
      gyro.data.z,

    canTrigger:
      steeringCooldown.canTrigger,

    enabled:
      !!activeSession,
  });

  const {
    speed,
    location,
  } =
    useLocationTracking();

  const distance =
    useDistanceTracking({
      latitude:
        location.latitude,

      longitude:
        location.longitude,
    });

  const seconds =
    useDriveTimer(
      !!activeSession
    );

  const timer =
    formatTime(seconds);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <DriveHeader />

        {/* <DriveOverviewCard
          timer={timer}
          speed={speed}
          distance={distance}
        /> */}

        <View style={styles.liveStats}>
  <Text style={styles.timer}>
    {timer}
  </Text>

  <Text style={styles.subStats}>
    {(speed * 3.6).toFixed(1)}
    {" km/h • "}
    {distance.toFixed(2)}
    {" km"}
  </Text>
</View>

        <ScoreCard />

        <View style={styles.eventsRow}>
          <View style={styles.eventSubRow}>
            <View style={{flex: 1}}>
            <EventCounterCard
              label="Brake"
              count={
                stats.brakeCount
              }
            />
          </View>

          <View style={{flex: 1}}
          >
            <EventCounterCard
              label="Turn"
              count={
                stats.turnCount
              }
            />
          </View>
          <View style={{flex: 1}}>
            <EventCounterCard
              label="Phone"
              count={
                stats.phoneCount
              }
            />
          </View>
          </View>

          <View style={styles.eventSubRow}>
              <View
            style={{
              flex: 1,
            }}
          >
            <EventCounterCard
              label="Steer"
              count={
                stats.steeringCount
              }
            />
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <EventCounterCard
              label="Move"
              count={
                stats.movementCount
              }
            />
          </View>
          </View>
        </View>

        <GradientButton
          title="End Drive"
          onPress={() => {
            endDrive();

            router.push(
              "/drive/summary"
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        Colors.background,
    },

    content: {
      padding:
        Spacing.md,

      gap:
        Spacing.md,
    },
    liveStats: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
  alignItems: "center",

  marginVertical: 8,
},

timer: {
  color: Colors.success,

  fontSize: 22,

  fontWeight: "800",
},

subStats: {
  color: Colors.success,

  fontSize: 16,

  marginTop: 4,
},

    eventsRow: {
      flexDirection:
        "column",

      gap:
        Spacing.xs,
    },
    eventSubRow : {
      flexDirection: "row",
      gap: 5
    }
  });