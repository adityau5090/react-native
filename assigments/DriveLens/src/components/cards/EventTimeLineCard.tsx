import {
    Text,
    View,
    StyleSheet,
} from "react-native";

import { GlassCard } from "../common/GlassCard";

import {
    Colors,
    Spacing,
} from "@/theme";

import { useDriveStore } from "@/store/driveStore";

export function EventTimelineCard() {
    // const events = useDriveStore((state) => state.activeSession?.events ?? []
    //     );
    const activeSession = useDriveStore((state) => state.activeSession);

    const events = activeSession?.events || [];

    return (
        <GlassCard>
            <Text style={styles.title}>
                Event Timeline
            </Text>

            {events.length === 0 ? (
                <Text style={styles.empty}>
                    No events detected
                </Text>
            ) : (
                events
                    .slice(-5)
                    .reverse()
                    .map(
                        (event) => (
                            <View
                                key={
                                    event.id
                                }
                                style={
                                    styles.row
                                }
                            >
                                <Text
                                    style={
                                        styles.type
                                    }
                                >
                                    {
                                        event.type
                                    }
                                </Text>

                                <Text
                                    style={
                                        styles.time
                                    }
                                >
                                    {new Date(
                                        event.timestamp
                                    ).toLocaleTimeString()}
                                </Text>
                            </View>
                        )
                    )
            )}
        </GlassCard>
    );
}

const styles =
    StyleSheet.create({
        title: {
            color:
                Colors.text,

            fontWeight:
                "700",

            marginBottom:
                Spacing.md,
        },

        empty: {
            color:
                Colors.textSecondary,
        },

        row: {
            flexDirection:
                "row",

            justifyContent:
                "space-between",

            marginBottom:
                Spacing.sm,
        },

        type: {
            color:
                Colors.text,
        },

        time: {
            color:
                Colors.textSecondary,
        },
    });