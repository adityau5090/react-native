import { Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/theme";
import { ScoreCard } from "@/components/cards/ScoreCard";
import { StreakCard } from "@/components/cards/StreakCard";
import { StyleSheet } from "react-native";
import { DashboardHeader } from "@/components/common/DashboardHeader";
import { PointsCard } from "@/components/cards/PointsCard";
import { GradientButton } from "@/components/buttons/GradientButton";
import { useRouter } from "expo-router";
import { getSessions } from "@/storage/sessionStorage";
import { useStreak } from "@/hooks/useStreak";
import { claimStreakReward } from "@/services/streak/claimStreakReward";
import { useXP } from "@/hooks/useXP";
import { XPCard } from "@/components/cards/XpCard";

export default function HomeScreen() {
  const router = useRouter();
  const {streak, refresh} = useStreak();
  const { xp } = useXP()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 5
        }}
      >
        <DashboardHeader />

<ScoreCard />

<View style={styles.row}>
  <View style={{ flex: 1 }}>
    <StreakCard  streak={streak.currentStreak} completedCycle={streak.completedCycle} onClaimReward={async () => {await claimStreakReward()}} />
  </View>

  <View style={{ flex: 1 }}>
    <PointsCard />
  </View>

  <XPCard xp={xp} />
</View>

<GradientButton title="Start Drive" onPress={()=> router.push("/drive/active")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
  flexDirection: "column",

  gap: 12,

  marginTop: 16,
},
})