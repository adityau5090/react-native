import React, { use, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  useColorScheme,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  useWindowDimensions,
  StatusBar,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"

type Note = {
  id: string;
  title: string;
  preview: string;
  content: string;
  date: string;
};

const NOTES: Note[] = [
  {
    id: "1",
    title: "Meeting Notes",
    preview: "Discussed mobile app onboarding flow...",
    content:
      "Discussed mobile app onboarding flow and new animation ideas.",
    date: "12 Aug",
  },
  {
    id: "2",
    title: "Shopping List",
    preview: "Milk, Bread, Coffee, Fruits...",
    content: "Milk, Bread, Coffee, Fruits, Vegetables.",
    date: "10 Aug",
  },
  {
    id: "5",
    title: "Travel Checklist",
    preview: "Passport, tickets, charger, headphones...",
    content:
      "Pack passport, tickets, charger, headphones, clothes, and camera.",
    date: "02 Aug",
  },
  {
    id: "6",
    title: "Project Tasks",
    preview: "Complete authentication UI and API setup...",
    content:
      "Finish authentication screens, connect backend APIs, and test flows.",
    date: "30 Jul",
  },
  {
    id: "4",
    title: "Workout Plan",
    preview: "Chest day exercises and cardio routine...",
    content:
      "Monday: Chest workout, 20 min cardio, and stretching exercises.",
    date: "05 Aug",
  },
  {
    id: "7",
    title: "Books to Read",
    preview: "Atomic Habits, Deep Work, Clean Code...",
    content:
      "Read Atomic Habits, Deep Work, and Clean Code this month.",
    date: "28 Jul",
  },
  {
    id: "3",
    title: "Ideas",
    preview: "Build a modern notes app UI...",
    content: "Build a modern notes app UI with dark mode support.",
    date: "08 Aug",
  },
  {
    id: "8",
    title: "Daily Journal",
    preview: "Today I focused on UI animations...",
    content:
      "Worked on smooth animations, fixed dark mode bugs, and improved app performance.",
    date: "14 Aug",
  },

  {
    id: "9",
    title: "Recipe Ideas",
    preview: "Pasta, oats smoothie, grilled sandwich...",
    content:
      "Try making creamy pasta, protein oats smoothie, and grilled sandwiches this week.",
    date: "11 Aug",
  },

  {
    id: "10",
    title: "Movie Watchlist",
    preview: "Interstellar, Inception, The Batman...",
    content:
      "Watch Interstellar again and finish The Batman over the weekend.",
    date: "09 Aug",
  },

  {
    id: "11",
    title: "Coding Notes",
    preview: "Learn useReducer and context API...",
    content:
      "Practice React hooks including useReducer and Context API with examples.",
    date: "07 Aug",
  },

  {
    id: "12",
    title: "Morning Routine",
    preview: "Meditation, gym, healthy breakfast...",
    content:
      "Wake up at 6 AM, meditate for 10 mins, then complete workout and breakfast.",
    date: "06 Aug",
  },

  {
    id: "13",
    title: "Finance Goals",
    preview: "Track expenses and save monthly income...",
    content:
      "Reduce unnecessary spending and maintain monthly savings target.",
    date: "04 Aug",
  },

  {
    id: "14",
    title: "Content Planning",
    preview: "Post coding reels and UI showcases...",
    content:
      "Create short-form coding content and share React Native UI designs online.",
    date: "03 Aug",
  },

  {
    id: "15",
    title: "Exam Preparation",
    preview: "Revise DBMS, OS, and networking topics...",
    content:
      "Focus on DBMS normalization, CPU scheduling, and networking protocols.",
    date: "01 Aug",
  },
];

export default function App() {


  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const theme = isDark ? darkTheme : lightTheme;

  const [notes, setNotes] = useState(NOTES)
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [manualDark, setManualDark] = useState(isDark);
  const [isLoading, setIsLoading] = useState(false);
  const [mainBg, setMainBg] = useState(true)

  const [modalVisible, setModalVisible] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newDate, setNewDate] = useState("");

  const currentTheme = manualDark ? darkTheme : lightTheme;

  const filteredNotes = useMemo(() => {
    return notes.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, notes]);

  const openNote = (note: Note) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const goBack = () => {
    setSelectedNote(null);
  };

  const saveNote = () => {
    console.log("save called")
    const updateNotes = notes.map((item) => {
      if (item.id === selectedNote?.id) {
        return {
          ...item,
          title: title,
          content: content,
          preview: content.slice(0, 20) + "...",
        }
      }
      return item;
    })

    setNotes(updateNotes)
    setSelectedNote(null)
  }

  const addNote = () => {
    setModalVisible(true)

  }

  const saveNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: newTitle,
      preview: newContent.slice(0, 20) + "...",
      content: newContent,
      date: newDate,
    };

    setNotes([newNote, ...notes]);
    NOTES

    setNewTitle("");
    setNewContent("");
    setNewDate("");

    setModalVisible(false);
  };




  if (mainBg) {
    return (
      <View style={styles.safeContainer}>
        <ImageBackground source={require("@/assets/images/bg-image.png")}
          style={styles.bgimage}
          resizeMode="cover"
        >
          <Pressable style={[styles.startbtn]}
            onPress={() => [setMainBg(false), setIsLoading(true), setTimeout(() => {
              setIsLoading(false)
            }, 1000)]}>
            <Text style={{ color: "#fff", fontSize: 25 }}>Get Started</Text>
          </Pressable>

        </ImageBackground>
      </View>
    )
  }
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeContainer, { justifyContent: "center", alignItems: "center", backgroundColor: currentTheme.background, flexDirection: "row", gap: "10" }]}>
        <Text style={{ color: currentTheme.text, fontSize: 20 }}>Loading</Text>
        <ActivityIndicator size="small" color={currentTheme.text} />
      </SafeAreaView>
    )
  }
  // console.log(Platform.OS)
  if (selectedNote) {
    return (
      <SafeAreaView
        style={[
          styles.safeContainer,
          { backgroundColor: currentTheme.background },
        ]}
      >

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={styles.flex}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
                }}
                style={styles.headerImage}
                imageStyle={styles.headerImageStyle}
              >
                <View style={styles.overlay} />

                <Text
                  style={[
                    styles.headerTitle,
                    { color: currentTheme.white },
                  ]}
                >
                  Edit Note
                </Text>
              </ImageBackground>

              <View
                style={[
                  styles.editorContainer,
                  {
                    backgroundColor: currentTheme.card,
                  },
                ]}
              >
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Note title"
                  placeholderTextColor={currentTheme.placeholder}
                  style={[
                    styles.titleInput,
                    { color: currentTheme.text },
                  ]}
                />

                {/* <Text>{}</Text> */}

                <TextInput
                  multiline
                  value={content}
                  onChangeText={setContent}
                  placeholder="Write your thoughts..."
                  placeholderTextColor={currentTheme.placeholder}
                  textAlignVertical="top"
                  style={[
                    styles.contentInput,
                    {
                      color: currentTheme.text,
                      backgroundColor: currentTheme.input,
                    },
                  ]}
                />

                <View style={styles.buttonRow}>
                  <Pressable
                    style={[
                      styles.secondaryButton,
                      {
                        borderColor: currentTheme.border,
                      },
                    ]}
                    onPress={goBack}
                  >
                    <Text
                      style={[
                        styles.secondaryButtonText,
                        { color: currentTheme.text },
                      ]}
                    >
                      Back
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.primaryButton,
                      {
                        backgroundColor: currentTheme.primary,
                      },
                    ]}
                    onPress={saveNote}
                  >
                    <Text style={styles.primaryButtonText}>Save</Text>
                  </Pressable>
                </View>
              </View>

            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: currentTheme.background },
      ]}
    >
      <StatusBar barStyle={manualDark ? "light-content" : "light-content"} />

      <View
        style={[
          styles.container,
          {
            paddingHorizontal: isTablet ? 40 : 20,
          },
        ]}
      >
        <View style={styles.topRow}>
          <View>
            <Text
              style={[
                styles.heading,
                {
                  color: currentTheme.text
                },
              ]}
            >
              QuickNote
            </Text>

            <Text
              style={[
                styles.subHeading,
                { color: currentTheme.subText },
              ]}
            >
              Organize your thoughts
            </Text>
            <Text
              style={[
                styles.subHeading,
                { color: currentTheme.subText },
              ]}
            >
              Total notes : {notes.length}
            </Text>
          </View>

          <Switch
            value={manualDark}
            onValueChange={setManualDark}
          />
        </View>

        <View style={[styles.searchContainer, {
          backgroundColor: currentTheme.input,
          borderColor: currentTheme.border,
        }]}>
          <Ionicons name="search" size={22} color={currentTheme.placeholder} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search notes..."
            placeholderTextColor={currentTheme.placeholder}
            style={[
              styles.searchInput,
              {
                backgroundColor: currentTheme.input,
                color: currentTheme.text,
                borderColor: currentTheme.border,
              },
            ]}
          />
          <Pressable
            onPress={addNote}>
            <Ionicons name="pulse-sharp" size={28} color={currentTheme.text} />
          </Pressable>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalCard,
                { backgroundColor: currentTheme.card },
              ]}
            >
              <Text
                style={{
                  color: currentTheme.text,
                  fontSize: 24,
                  fontWeight: "700",
                  marginBottom: 20,
                }}
              >
                Add Note
              </Text>

              <TextInput
                placeholder="Title"
                placeholderTextColor={currentTheme.placeholder}
                value={newTitle}
                onChangeText={setNewTitle}
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: currentTheme.input,
                    color: currentTheme.text,
                  },
                ]}
              />

              <TextInput
                placeholder="Content"
                placeholderTextColor={currentTheme.placeholder}
                value={newContent}
                onChangeText={setNewContent}
                multiline
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: currentTheme.input,
                    color: currentTheme.text,
                    height: 120,
                  },
                ]}
              />

              <TextInput
                placeholder="Date"
                placeholderTextColor={currentTheme.placeholder}
                value={newDate}
                onChangeText={setNewDate}
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: currentTheme.input,
                    color: currentTheme.text,
                  },
                ]}
              />

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  style={[
                    styles.primaryButton,
                    { borderWidth: 1 }
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.secondaryButtonText}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.primaryButton,
                    { backgroundColor: "rgba(251, 146, 60, 0.49)" },
                  ]}
                  onPress={saveNewNote}
                >
                  <Text style={styles.primaryButtonText}>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => openNote(item)}
              style={[
                styles.card,
                {
                  backgroundColor: currentTheme.card,
                  borderColor: currentTheme.border,
                }
              ]}
            >
              <View style={styles.cardTop}>
                <View style={{ gap: 15 }}>
                  <Text
                    style={[
                      styles.cardTitle,
                      {
                        color: currentTheme.text,
                        backgroundColor: currentTheme.titleBg,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.preview,
                      { color: currentTheme.subText },
                    ]}
                  >
                    {item.preview}
                  </Text>
                </View>

                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                  <Text
                    style={[
                      styles.date,
                      { color: currentTheme.subText },
                    ]}
                  >
                    {item.date}
                  </Text>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("@/assets/images/doodle-image.png")}
                  />
                </View>
              </View>


            </Pressable>
          )}
        />
      </View>
      {/* <ActivityIndicator /> */}
    </SafeAreaView>
  );
}

const lightTheme = {
  background: "#D9D0B3",
  card: "#e9e4d5",
  text: "#1E293B",
  subText: "#64748B",
  primary: "#2563EB",
  border: "#5b5e6193",
  input: "#FFFFFF",
  placeholder: "#94A3B8",
  white: "#FFFFFF",
  titleBg: "rgba(251, 146, 60, 0.28)",
};

const darkTheme = {
  background: "#0F172A",
  card: "#1E293B",
  text: "#F8FAFC",
  subText: "#94A3B8",
  primary: "#3B82F6",
  border: "#334155",
  input: "#172033",
  placeholder: "#64748B",
  white: "#FFFFFF",
  titleBg: "rgba(112, 115, 116, 0.29)"
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  heading: {
    fontSize: 32,
    fontWeight: "700",
  },

  subHeading: {
    fontSize: 15,
    marginTop: 4,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14

  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    elevation: 3
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start"
    // flex: 1,
  },

  date: {
    fontSize: 13,
    marginLeft: 10,
  },

  preview: {
    fontSize: 15,
    lineHeight: 22,
    width: 240
  },
  bgimage: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // paddingBottom: 20
  },

  headerImage: {
    height: 240,
    justifyContent: "flex-end",
    padding: 24,
  },

  headerImageStyle: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    zIndex: 10,
  },

  editorContainer: {
    margin: 20,
    borderRadius: 24,
    padding: 20,
  },

  titleInput: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentInput: {
    minHeight: 220,
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  primaryButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  startbtn: {
    width: "85%",
    height: "6%",
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#111",
    opacity: 2,
    color: "#fff"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 20,
    height: 54,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "88%",
    borderRadius: 24,
    padding: 20,
  },

  modalInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },
});