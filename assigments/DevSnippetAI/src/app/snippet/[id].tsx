import { deleteSnippet, getSnippetById, toggleFavorite } from "@/database/snippet.service";
import { explainCode } from "@/services/ai.service";
import { exportAsText } from "@/services/export.service";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";

export default function SnippetDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter()

    const [snippet, setSnippet] = useState<any>(null)
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState("")
    const [aiResponse, setAiResponse] = useState<any>(null)
    const [isExplaining, setIsExplaining] = useState(false)

    // console.log(aiResponse)
    useEffect(() => {
        if (id) {
            loadData()
        }
    }, [id])

    const loadData = async () => {
        setError("")
        try {
            const data = await getSnippetById(Number(id))
            setSnippet(data)
        } catch (err: any) {
            setError(err?.message || "Something went wrong")
        } finally {
            setLoader(false)
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            "Delete Snippet",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const success =
                            await deleteSnippet(
                                Number(id)
                            );

                        if (success) {
                            router.back();
                        }
                    },
                },
            ]
        );
    };

    const handleFavorite = async () => {
        const success = await toggleFavorite(Number(id), snippet.favorite)
        if (success) loadData();
    }

    const handleExport = async () => {
        await exportAsText(
            snippet.title,
            snippet.code
        );
    };

    const handleExplain = async () => {
        try {
            setIsExplaining(true);

            const result = await explainCode(snippet.code);

            if (result) {
                const parsed = JSON.parse(result)
                setAiResponse(parsed);
            }
        } finally {
            setIsExplaining(false);
        }
    };

    if (loader) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading....</Text>
            </View>
        )
    }
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Failed to fetch snippet</Text>
            </View>
        )
    }

    if (!snippet) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Snippet not found</Text>
            </View>
        );
    }
    const tagsArray = snippet.tags.split(",");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === "ios" ? "padding" : undefined
            }
        >
            <ScrollView style={styles.container}>
                <View style={styles.favoriteContainer}>
                    <Text style={styles.title}>
                        {snippet.title}
                    </Text>
                    <TouchableOpacity onPress={handleFavorite}>
                        {snippet.favorite === 1 ?
                            (<View style={styles.favoriteButton}>
                                <Ionicons name="heart" size={24} color="red" />
                            </View>
                            ) :
                            (<View style={styles.favoriteButton}>
                                <Ionicons name="heart-outline" size={24} color="red" />
                            </View>
                            )
                        }

                    </TouchableOpacity>
                </View>
                {
                    snippet.imagePath ? (
                        <Image
                            source={{
                                uri: snippet.imagePath,
                            }}
                            style={styles.previewImage}
                        />
                    ) : null
                }

                <View style={styles.languageChip}>
                    <Text style={styles.language}>
                        {snippet.language}
                    </Text>
                </View>

                <View style={styles.tagContainer}>
                        {tagsArray?.map((tag: string) => (
                            <Text key={tag.trim()} style={[styles.tag ]}>{tag.trim()}</Text>
                        ))}
                        </View>

                <Text style={styles.codeTitle}>
                  &lt;Code /&gt;
                </Text>

                <View style={styles.codeContainer}>
                    <Text style={styles.code}>
                        {snippet.code}
                    </Text>
                </View>

                <View style={styles.favoriteContainer}>
                    <TouchableOpacity onPress={handleFavorite}>
                        {snippet.favorite === 1 ?
                            (<View style={styles.favoriteButton}>
                                <Ionicons name="heart" size={24} color="tomato" />
                            </View>
                            ) :
                            (<View style={styles.favoriteButton}>
                                <Ionicons name="heart-outline" size={24} color="tomato" />
                            </View>
                            )
                        }
                    </TouchableOpacity>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() =>
                                router.push(
                                    `/snippet/edit/${id}`
                                )
                            }
                        >
                            <Ionicons name="create" size={24} color="orange" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handleDelete}
                        >
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.aiButton}
                    onPress={handleExplain}
                    disabled={isExplaining}
                >
                    <Text style={styles.aiText}>
                        {isExplaining
                            ? "Generating..."
                            : "Explain Code"}
                    </Text>
                </TouchableOpacity>

                {
                    aiResponse && (
                        <View style={styles.aiContainer}>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    📝 Summary
                                </Text>

                                <Text style={styles.sectionText}>
                                    {aiResponse.summary}
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    🔍 Explanation
                                </Text>

                                <Text style={styles.sectionText}>
                                    {aiResponse.explanation}
                                </Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    🚀 Improvements
                                </Text>

                                {aiResponse.improvements?.map(
                                    (item: string, index: number) => (
                                        <Text
                                            key={index}
                                            style={styles.listItem}
                                        >
                                            • {item}
                                        </Text>
                                    )
                                )}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    ✅ Best Practices
                                </Text>

                                {aiResponse.bestPractices?.map(
                                    (item: string, index: number) => (
                                        <Text
                                            key={index}
                                            style={styles.listItem}
                                        >
                                            • {item}
                                        </Text>
                                    )
                                )}
                            </View>

                        </View>
                    )
                }
                <TouchableOpacity
                    style={styles.exportButton}
                    onPress={handleExport}
                >
                    <Text style={styles.exportText}>
                        Export TXT
                    </Text>
                </TouchableOpacity>

                {
                    aiResponse ? (
                        <View style={styles.aiContainer}>

                        </View>
                    ) : null
                }


            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAD8D8",
        padding: 20,
    },

    text: {
        color: "white",
    },

    title: {
        color: "#4E4040",
        fontSize: 36,
        fontWeight: "300",
        flex: 1,
        marginRight: 10,
    },
    previewImage: {
        width: "100%",
        height: 220,
        borderRadius: 30,
        marginTop: 20,
    },

    languageChip: {
        alignSelf: "flex-start",
        marginTop: 16,
        backgroundColor: "#D9B7B7",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 3
    },

    language: {
        color: "#6B4C4C",
        fontWeight: "600",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
        alignItems: "center",
    },
  tag: {
    marginRight: 12,
    borderWidth: 1.5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 30,
    borderColor: "#D9B7B7",
  },

  codeTitle: {
    color: "#6B4C4C",
    fontSize: 18,
    fontWeight: "600",
    // marginBottom: 10,
    marginTop: 20,
  },
    codeContainer: {
        marginTop: 5,

        backgroundColor:
            "rgba(255,255,255,0.35)",

        padding: 20,

        borderRadius: 30,

        borderWidth: 1,

        borderColor:
            "rgba(255,255,255,0.4)",
    },

    code: {
        color: "#4E4040",
        fontSize: 15,
        lineHeight: 24,
    },
    favoriteContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5
    },
    favoriteButton: {
        width: 52,
        height: 52,

        borderRadius: 26,

        backgroundColor:
            "rgba(255,255,255,0.45)",

        justifyContent: "center",

        alignItems: "center",
    },
    aiButton: {
        marginTop: 20,

        backgroundColor: "#C98181",

        padding: 18,

        borderRadius: 30,

        alignItems: "center",

        shadowColor: "#A45F5F",

        shadowOpacity: 0.2,

        shadowRadius: 12,

        elevation: 4,
    },

    aiText: {
        color: "white",
        fontWeight: "600",
    },

    favoriteText: {
        color: "white",
        fontWeight: "600",
        fontSize: 11
    },

    editButton: {
        marginTop: 20,
        backgroundColor: "#f59e0b",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    editText: {
        color: "white",
        fontWeight: "600",
    },


    deleteButton: {
        marginTop: 20,
        backgroundColor: "#dc2626ba",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    deleteText: {
        color: "white",
        fontWeight: "600",
    },
    buttons: {
        flexDirection: "row",
        gap: 5,
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        width: 52,
        height: 52,

        borderRadius: 26,

        backgroundColor:
            "rgba(255,255,255,0.45)",

        alignItems: "center",

        justifyContent: "center",
    },
    secondaryButton: {
        marginTop: 10,

        backgroundColor:
            "rgba(255,255,255,0.45)",

        padding: 18,

        borderRadius: 30,

        alignItems: "center",

        marginBottom: 50,
    },

    secondaryText: {
        color: "white",
    },
    aiContainer: {
        marginTop: 20,
    },

    section: {
        backgroundColor:
            "rgba(255,255,255,0.45)",

        padding: 20,

        borderRadius: 28,

        marginBottom: 14,
    },

    sectionTitle: {
        color: "#6B4C4C",

        fontSize: 20,

        fontWeight: "700",

        marginBottom: 12,
    },

    

    sectionText: {
        color: "#4E4040",

        fontSize: 15,

        lineHeight: 26,
    },

    listItem: {
        color: "#4E4040",

        lineHeight: 26,

        marginBottom: 8,
    },
    exportButton: {
        marginTop: 20,

        backgroundColor: "#D9B7B7",

        padding: 18,

        borderRadius: 30,

        alignItems: "center",
    },
    exportText: {
        color: "#4E4040",

        fontWeight: "700",
    },
});