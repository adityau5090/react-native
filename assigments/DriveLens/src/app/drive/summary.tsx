import {ScrollView,View,Text,StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {Colors,Spacing,} from "@/theme";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientButton } from "@/components/buttons/GradientButton";
import { SummaryStatCard } from "@/components/cards/SummaryStatCard";
import { useDriveSummary } from "@/hooks/useDriveSummary";
import { formatDuration } from "@/utils/formatDuration";

export default function SummaryScreen() {
  const summary = useDriveSummary();
  // console.log("Summary :",summary)

  if (!summary) {return null;}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          🎉 Drive Complete
        </Text>

        <GlassCard>
          <Text style={styles.score}>
            {summary.score}
          </Text>
          <Text
            style={[styles.rating,
              {color: summary.rating.color},
            ]}
          >
            {summary.rating.label}
          </Text>
        </GlassCard>

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <SummaryStatCard 
            label="Duration"
            value={formatDuration(summary.session.duration)}
          />
          </View>

          <View style={{flex: 1}}>
            <SummaryStatCard
            label="Events"
            value={summary.totalEvents}
          />
          </View>
          
        </View>

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <SummaryStatCard
          label="XP Earned"
          value={`+${summary.pointsEarned}`}
        />
          </View>
          <View style={{flex: 1}}>
            <SummaryStatCard
          label="Total distance"
          value={`${summary.distance} km`}
        />
          </View>
        </View>

        <GlassCard>
          <Text style={styles.sectionTitle}>
            Event Breakdown
          </Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownText}>Brake</Text>
            <Text style={styles.breakdownText}>{summary.brakeCount}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownText}>Sharp Turn</Text>
            <Text style={styles.breakdownText}>{summary.sharpTurn}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownText}>Phone</Text>
            <Text style={styles.breakdownText}>{summary.phoneCount}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownText}>Movement</Text>
            <Text style={styles.breakdownText}>{summary.movementCount}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownText}>Aggressive Steering </Text>
            <Text style={styles.breakdownText}>{summary.aggressiveSteering}</Text>
          </View>
        </GlassCard>

        <GradientButton
          title="Back Home"
          onPress={() =>{
            router.dismissAll()
            router.replace("/(tabs)")
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },

  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  score: {
    color: Colors.text,
    fontSize: 64,
    fontWeight: "800",
    textAlign: "center",
  },

  rating: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  sectionTitle: {
    color: Colors.text,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },

  breakdownRow: {
    flexDirection: "row",
    justifyContent:"space-between",
    marginBottom:Spacing.sm,
  },
  breakdownText: {
    color: Colors.text
  }
});