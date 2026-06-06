import {View,Text,StyleSheet, TouchableOpacity} from "react-native";
import { GlassCard } from "@/components/common/GlassCard";
import {Colors,Spacing} from "@/theme";
import { DriveSession } from "@/types/drive";
import { formatDuration } from "@/utils/formatDuration";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { getSafetyRating } from "@/services/scoring/ratingEngine";
import { Feather } from "@expo/vector-icons";

type Props = {
  session: DriveSession;
  onDelete: (id: string) => void;
};

export function HistorySessionCard({
  session, onDelete
}: Props) {
  const rating =
    getSafetyRating(
      session.score
    );

  return (
    <GlassCard>
      <View style={styles.header}>

        <View>
          <Text style={styles.date}>
            {formatRelativeDate(
              session.startedAt
            )}
          </Text>

          <Text style={styles.score}>
            Score {session.score}
          </Text>
        </View>

        <View style={styles.badgeContainer}>
          <View
          style={[
            styles.badge,
            {
              borderColor:
                rating.color,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color:
                  rating.color,
              },
            ]}
          >
            {rating.label}
          </Text>
        </View>
        <TouchableOpacity
  onPress={() =>
    onDelete(
      session.id
    )
  }
>
  <Text
    style={
      styles.deleteText
    }
  >
    <Feather
  name="trash-2"
  size={18}
  color={
    Colors.textSecondary
  }
/>
  </Text>
</TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${session.score}%`,
            },
          ]}
        />
      </View>

      <View style={styles.statsRow}>
        <InfoItem
          label="Duration"
          value={formatDuration(
            session.duration
          )}
        />

        <InfoItem
          label="Events"
          value={
            session.events.length
          }
        />

        <InfoItem
          label="XP"
          value={`+${session.score}`}
        />
      </View>
    </GlassCard>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <View>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 12,
  },
  deleteText: {
  fontSize: 18,
},

  date: {
    color:
      Colors.textSecondary,

    fontSize: 13,
  },

  score: {
    color: Colors.text,

    fontSize: 24,

    fontWeight: "800",

    marginTop: 4,
  },

  badge: {
    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 999,

    borderWidth: 1,

    backgroundColor:
      "rgba(255,255,255,0.03)",
  },

  badgeText: {
    fontSize: 12,

    fontWeight: "700",
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  },

  progressTrack: {
    height: 8,

    backgroundColor:
      Colors.danger,

    borderRadius: 999,

    overflow: "hidden",

    marginBottom: 18,
  },

  progressFill: {
    height: "100%",

    backgroundColor:
      Colors.primary,

    borderRadius: 999,
  },

  statsRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",
  },

  infoLabel: {
    color:
      Colors.textSecondary,

    fontSize: 12,
  },

  infoValue: {
    color: Colors.text,

    marginTop: 4,

    fontWeight: "700",
  },
});