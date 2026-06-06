import { View, Text, StyleSheet } from "react-native";
import { GlassCard } from "../common/GlassCard";
import { Colors, Spacing } from "@/theme";
import { GradientButton } from "../buttons/GradientButton";

type Props = {
    streak: number;
    completedCycle: boolean;
    onClaimReward?: () => void;
};

export function StreakCard({ streak, completedCycle, onClaimReward }: Props) {
    return (
        <GlassCard>
            <Text style={styles.title}>
                🔥 Current Streak
            </Text>

            <View style={styles.dots}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot,
                        index < streak && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
            {
                completedCycle ? (
                    <>
                        <Text style={styles.rewardReady}>
                            🎁 Reward Ready
                        </Text>
                        <GradientButton
                            title="Claim +500 XP"
                            onPress={
                                onClaimReward
                            }
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.days}>
                            Day {streak} / 6
                        </Text>

                        <Text
                            style={styles.reward}
                        >
                            {6 - streak} days until
                            bonus
                        </Text>
                    </>
                )
            }
        </GlassCard>
    );
}

const styles =
    StyleSheet.create({
        title: {
            color: Colors.text,

            fontSize: 18,

            fontWeight: "700",
        },

        dots: {
            flexDirection: "row",

            marginTop: 20,

            gap: 10,
        },

        dot: {
            width: 12,

            height: 12,

            borderRadius: 999,

            backgroundColor:
                Colors.surface,
        },

        activeDot: {
            backgroundColor:
                Colors.primary,
        },


        days: {
            marginTop: 16,

            color: Colors.text,

            fontWeight: "700",
        },

        reward: {
            marginTop: 6,

            color:
                Colors.textSecondary,
        },
        rewardReady: {
            color:
                Colors.primary,

            marginTop: 12,

            fontWeight: "700",

            fontSize: 16,
        },
    });