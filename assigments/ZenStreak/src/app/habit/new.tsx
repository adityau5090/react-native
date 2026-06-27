import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GlassCard } from "@/components/ui/GlassCard";
import Screen from "@/components/ui/Screen";
import { PRESET_HABITS } from "@/constants/HABITS";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { router } from "expo-router";
import { createHabit } from "@/db/habits.repository";
import { Habit } from "@/constants/habit";
import { useHabitStore } from "@/store/habit.store";
import { useNotifications } from "@/hooks/useNotifications";
import { scheduleIntervalNotifications, scheduleSmartNotification, scheduleWeeklyNotification } from "@/lib/notifications/schedular";
import * as Linking from "expo-linking";
import { getMotivationalMessage } from "@/lib/notifications/message";

const EMOJIS = [
  "💧",
  "💻",
  "📚",
  "🏋️",
  "🧘",
  "🏃",
  "🥗",
  "☕",
  "😴",
  "📝",
  "🎯",
  "🎸",
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const intervalOptions = [
  "15 minutes",
  "30 minutes",
  "45 minutes",
  "1 hour",
  "2 hours",
  "3 hours",
  "4 hours",
];

function parseInterval(option: string) {
  switch (option) {
    case "15 minutes":
      return 15;

    case "30 minutes":
      return 30;

    case "45 minutes":
      return 45;

    case "1 hour":
      return 60;

    case "2 hours":
      return 120;

    case "3 hours":
      return 180;

    case "4 hours":
      return 240;

    default:
      return 120;
  }
}

export default function NewHabitScreen() {
  const colors = useTheme();
  const habitId = uuid.v4();

  const [emoji, setEmoji] = useState("💻");

  const [title, setTitle] = useState("");

  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const [weekdays, setWeekdays] = useState<number[]>([]);

  const [showHabitDropdown, setShowHabitDropdown] = useState(false);

  const [selectedHabit, setSelectedHabit] = useState("Select Habit");
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);

  const [reminderTime, setReminderTime] = useState(new Date());
  const [reminderMode, setReminderMode] = useState<"once" | "interval">("once");
  const [intervalOption, setIntervalOption] =useState("15 minutes");

  const [showTimePicker, setShowTimePicker] = useState(false);

  const { granted, requestPermission } = useNotifications();
  const addHabit = useHabitStore((state) => state.addHabit);

  const toggleDay = (index: number) => {
    if (weekdays.includes(index)) {
      setWeekdays(
        weekdays.filter((day) => day !== index)
      );
    } else {
      setWeekdays([...weekdays, index]);
    }
  };

  const handleSaveHabit = async () => {

    try {


      if (selectedHabit === "Select Habit") {
        Alert.alert(
          "Habit Required",
          "Please select a habit first."
        );

        return;
      }
      const habitName = selectedHabit === "Custom Habit" ? title.trim() : selectedHabit.trim();

      
      if (!habitName) {
        Alert.alert(
          "Habit Required",
          "Please select or enter a habit."
        );

        return;
      }

      

      if (
        frequency === "weekly" &&
        weekdays.length === 0
      ) {
        Alert.alert(
          "No Days Selected",
          "Select at least one weekday."
        );

        return;
      }

      // Permission

      let hasPermission = granted;

      if (!hasPermission) {
        hasPermission = await requestPermission();
      }


      let notificationIds: string[] = [];

      // Schedule notifications

      

      if (hasPermission) {
        const hour = reminderTime.getHours();

        const minute = reminderTime.getMinutes();

        if (frequency === "daily") {

          const tempHabit: Habit = {
    id: habitId,
    title: habitName,
    emoji,
    frequency,
    weekdays,
    reminderHour: hour,
    reminderMinute: minute,
    reminderMode,
    streak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    completedToday: false,
    notificationIds: [],
    createdAt: new Date().toISOString(),
  };

          const id = await scheduleSmartNotification(
            tempHabit
          );


          if (reminderMode === "interval") {
  const intervalMinutes =
    parseInterval(intervalOption);

  notificationIds =
    await scheduleIntervalNotifications(
      `${emoji} ${habitName}`,
      getMotivationalMessage(
        tempHabit
      ),
      intervalMinutes,
      hour,
      minute,
      habitId
    );
}

          notificationIds = [id];
        }

        if (frequency === "weekly") {
         notificationIds =
  await scheduleWeeklyNotification(
    `${emoji} ${habitName}`,
    getMotivationalMessage({
      id: habitId,
      title: habitName,
      emoji,
      frequency,
      weekdays,
      reminderHour: hour,
      reminderMinute: minute,
      streak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      completedToday: false,
      notificationIds: [],
      createdAt: new Date().toISOString(),
    }),
    weekdays,
    hour,
    minute,
    habitId
  );
        }
      }

      // Create habit object

      const newHabit: Habit = {
        id: habitId,
        title: habitName,
        emoji,
        frequency,
        weekdays,
        reminderHour: reminderTime.getHours(),
        reminderMinute: reminderTime.getMinutes(),
        streak: 0,
        longestStreak: 0,
        lastCompletedDate: null,
        completedToday: false,
        notificationIds,
        createdAt: new Date().toISOString(),
      };

      // Save

      createHabit(newHabit);

      addHabit(newHabit);

      Alert.alert(
        "Success",
        "Habit created successfully!"
      );

      router.back();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Something went wrong."
      );
    }
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={[
            styles.heading,
            { color: colors.text },
          ]}
        >
          Create Habit
        </Text>

        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          Choose Habit
        </Text>

        {/* ── HABIT DROPDOWN (inline, no position:absolute) ── */}
        <View style={styles.dropdownWrapper}>
          <Pressable
            onPress={() =>
              setShowHabitDropdown(!showHabitDropdown)
            }
            style={[
              styles.dropdown,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
              }}
            >
              {selectedHabit}
            </Text>

            <Ionicons
              name={
                showHabitDropdown
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={22}
              color={colors.text}
            />
          </Pressable>

          {showHabitDropdown && (
            <View
              style={[
                styles.dropdownList,
                { backgroundColor: colors.card },
              ]}
            >
              {PRESET_HABITS.map((habit) => (
                <Pressable
                  key={habit.title}
                  style={[
                    styles.dropdownItem,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => {
                    setSelectedHabit(habit.title);

                    if (habit.title !== "Custom Habit") {
                      setTitle(habit.title);
                      setEmoji(habit.emoji);
                    } else {
                      setTitle("");
                    }

                    setShowHabitDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownEmoji}>
                    {habit.emoji}
                  </Text>

                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                    }}
                  >
                    {habit.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {selectedHabit === "Custom Habit" && (
          <>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                  marginTop: 30,
                },
              ]}
            >
              Custom Habit
            </Text>

            <GlassCard>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter habit name"

                placeholderTextColor={
                  colors.textSecondary
                }

                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </GlassCard>

            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                  marginTop: 30,
                },
              ]}
            >
              Emoji
            </Text>

            <Pressable
              onPress={() =>
                setShowEmojiDropdown(!showEmojiDropdown)
              }
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={{ fontSize: 28 }}>
                {emoji}
              </Text>

              <Ionicons
                name={
                  showEmojiDropdown
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={22}
                color={colors.text}
              />
            </Pressable>

            {showEmojiDropdown && (
              <View style={styles.emojiGrid}>
                {EMOJIS.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setEmoji(item);
                      setShowEmojiDropdown(false);
                    }}
                    style={[
                      styles.emojiButton,
                      {
                        backgroundColor: colors.card,
                      },
                    ]}
                  >
                    <Text style={styles.emoji}>
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}



        <Text
          style={[
            styles.label,
            {
              color: colors.text,
              marginTop: 30,
            },
          ]}
        >
          Frequency
        </Text>

        <View style={styles.frequencyRow}>
          {["daily", "weekly"].map((item) => (
            <Pressable
              key={item}
              onPress={() =>
                setFrequency(
                  item as "daily" | "weekly"
                )
              }
              style={[
                styles.frequencyButton,

                {
                  backgroundColor:
                    frequency === item
                      ? colors.primary
                      : colors.card,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    frequency === item
                      ? "#fff"
                      : colors.text,

                  fontWeight: "600",
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {frequency === "weekly" && (
          <>
            <Text
              style={[
                styles.label,
                {
                  color: colors.text,
                  marginTop: 15,
                },
              ]}
            >
              Select Days
            </Text>

            <View style={styles.daysRow}>
              {DAYS.map((day, index) => {
                const isSelected =
                  weekdays.includes(index);

                return (
                  <Pressable
                    key={index}
                    onPress={() => toggleDay(index)}
                    style={[
                      styles.dayButton,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.card,

                        borderColor: isSelected
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: isSelected
                            ? "#fff"
                            : colors.text,
                        },
                      ]}
                    >
                      {day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        <Text
          style={[
            styles.label,
            {
              color: colors.text,
              marginTop: 30,
            },
          ]}
        >
          Reminder Time
        </Text>

        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
            }}
          >
            {reminderTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          <Ionicons
            name="time-outline"
            size={24}
            color={colors.text}
          />
        </Pressable>

        <Text
  style={[
    styles.label,
    { color: colors.text, marginTop: 15 },
  ]}
>
  Reminder Type
</Text>

<View style={styles.frequencyRow}>
  {["once", "interval"].map(
    (item) => (
      <Pressable
        key={item}
        onPress={() =>
          setReminderMode(
            item as "once" | "interval"
          )
        }
        style={[
          styles.frequencyButton,
          {
            backgroundColor:
              reminderMode === item
                ? colors.primary
                : colors.card,
          },
        ]}
      >
        <Text
          style={{
            color:
              reminderMode === item
                ? "#fff"
                : colors.text,
          }}
        >
          {item}
        </Text>
      </Pressable>
    )
  )}
</View>

{reminderMode === "interval" && (
  <>
    <Text
      style={[
        styles.label,
        {
          color: colors.text,
          marginTop: 20,
        },
      ]}
    >
      Repeat Every
    </Text>

    <GlassCard>
      {reminderMode === "interval" && (
  <>
    <Text
      style={[
        styles.label,
        { color: colors.text },
      ]}
    >
      Repeat Every
    </Text>

    <View style={styles.intervalContainer}>
      {intervalOptions.map((option) => (
        <Pressable
          key={option}
          onPress={() =>
            setIntervalOption(option)
          }
          style={[
            styles.intervalButton,
            {
              backgroundColor:
                intervalOption === option
                  ? colors.primary
                  : colors.card,
            },
          ]}
        >
          <Text
            style={{
              color:
                intervalOption === option
                  ? "#fff"
                  : colors.text,
            }}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  </>
)}
    </GlassCard>
  </>
)}

        {showTimePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);

              if (selectedTime) {
                setReminderTime(selectedTime);
              }
            }}
          />
        )}
        {!granted && (
          <GlassCard>
            <Text
              style={{
                color: colors.text,
                marginBottom: 10,
              }}
            >
              Notifications are disabled.
            </Text>

            <Pressable
              onPress={() =>
                Linking.openSettings()
              }
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                }}
              >
                Open Settings
              </Text>
            </Pressable>
          </GlassCard>
        )}

        {!granted && (
          <GlassCard>
            <Text
              style={{
                color: colors.text,
                marginBottom: 10,
              }}
            >
              Notifications are disabled.
            </Text>

            <Pressable
              onPress={() =>
                Linking.openSettings()
              }
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                }}
              >
                Open Settings
              </Text>
            </Pressable>
          </GlassCard>
        )}

        <Pressable
          onPress={handleSaveHabit}
          style={[
            styles.saveButton,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Text style={styles.saveText}>
            Save Habit
          </Text>
        </Pressable>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 34,
    fontWeight: "700",

    marginTop: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",

    marginBottom: 18,
  },
  dropdownWrapper: {
    zIndex: 1000,
  },
  dropdown: {
    height: 65,

    borderRadius: 24,

    paddingHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderWidth: 1,
  },
  /* Inline list — renders in normal flow so the
     outer ScrollView handles all scrolling        */
  dropdownList: {
    borderRadius: 24,
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  dropdownItem: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 16,

    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dropdownEmoji: {
    fontSize: 26,

    marginRight: 15,
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 12,

    marginBottom: 30,
  },
  emojiButton: {
    width: 60,
    height: 60,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
  },
  emoji: {
    fontSize: 28,
  },
  input: {
    fontSize: 20,
    paddingVertical: 6,
  },
  dropdownContainer: {
    maxHeight: 250,

    marginTop: 12,

    paddingVertical: 10,
  },
  dropdownAbsolute: {
    position: "absolute",

    top: 75,

    left: 0,
    right: 0,

    maxHeight: 250,

    borderRadius: 24,

    paddingHorizontal: 20,

    zIndex: 9999,
    elevation: 20,

    overflow: "hidden",
  },
  intervalContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 10,
},

intervalButton: {
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 16,
},
  dropdownListContainer: {
    maxHeight: 250,
  },
  emojiGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 12,

    marginTop: 20,
  },
  frequencyRow: {
    flexDirection: "row",

    gap: 12,
  },

  frequencyButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",

  },

  dayButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.1)",

    backgroundColor: "rgba(255,255,255,0.04)",
  },

  dayText: {
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    marginTop: 40,

    marginBottom: 120,

    paddingVertical: 18,

    borderRadius: 24,

    alignItems: "center",
  },

  saveText: {
    color: "#fff",

    fontSize: 18,

    fontWeight: "700",
  },
});
