import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";

interface CodeViewerProps {
  code: string;
}

export default function CodeViewer({
  code,
}: CodeViewerProps) {
  const lines = code.split("\n");

  const renderHighlightedLine = (
    line: string
  ) => {
    const keywords = [
      "const",
      "let",
      "var",
      "function",
      "return",
      "import",
      "export",
      "default",
      "async",
      "await",
      "if",
      "else",
      "for",
      "while",
      "switch",
      "case",
      "break",
      "continue",
      "try",
      "catch",
      "finally",
      "class",
      "extends",
      "new",
      "this",
      "interface",
      "type",
      "enum",
      "public",
      "private",
      "protected",
      "useState",
      "useEffect",
      "useMemo",
      "useCallback",
      "useRef",
      "useContext",
      "useRouter",
    ];

    const words = line.split(/(\s+)/);

    return (
      <Text style={styles.codeLine}>
        {words.map(
          (word, index) => {
            // Comments
            if (
              word.startsWith("//")
            ) {
              return (
                <Text
                  key={index}
                  style={
                    styles.comment
                  }
                >
                  {word}
                </Text>
              );
            }

            // Strings
            if (
              /^["'`].*["'`]$/.test(
                word
              )
            ) {
              return (
                <Text
                  key={index}
                  style={
                    styles.string
                  }
                >
                  {word}
                </Text>
              );
            }

            // Keywords
            if (
              keywords.includes(
                word
              )
            ) {
              return (
                <Text
                  key={index}
                  style={
                    styles.keyword
                  }
                >
                  {word}
                </Text>
              );
            }

            return (
              <Text key={index}>
                {word}
              </Text>
            );
          }
        )}
      </Text>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={
        false
      }
    >
      <View
        style={styles.codeContainer}
      >
        <View
          style={
            styles.editorHeader
          }
        >
          <View
            style={styles.redDot}
          />
          <View
            style={
              styles.yellowDot
            }
          />
          <View
            style={
              styles.greenDot
            }
          />
        </View>

        {lines.map(
          (line, index) => (
            <View
              key={index}
              style={
                styles.lineRow
              }
            >
              <Text
                style={
                  styles.lineNumber
                }
              >
                {index + 1}
              </Text>

              {renderHighlightedLine(
                line || " "
              )}
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    codeContainer: {
  backgroundColor: "#2D2A32",

  borderRadius: 18,

  paddingVertical: 14,
  paddingHorizontal: 12,

  minWidth: "100%",

  borderWidth: 1,
  borderColor: "#403D46",

  marginBottom: 20,
},

    editorHeader: {
      flexDirection: "row",

      marginBottom: 16,
    },

    redDot: {
      width: 10,
      height: 10,
      borderRadius: 5,

      backgroundColor:
        "#FF5F56",

      marginRight: 8,
    },

    yellowDot: {
      width: 10,
      height: 10,
      borderRadius: 5,

      backgroundColor:
        "#FFBD2E",

      marginRight: 8,
    },

    greenDot: {
      width: 10,
      height: 10,
      borderRadius: 5,

      backgroundColor:
        "#27C93F",
    },

    lineRow: {
      flexDirection: "row",

      alignItems:
        "flex-start",

      marginBottom: 4,
    },

    lineNumber: {
  width: 28,

  color: "#7D7785",

  textAlign: "right",

  marginRight: 10,

  fontSize: 11,
},
    codeLine: {
      flex: 1,

      color: "#F8F8F2",

      fontSize: 15,

      lineHeight: 40,

      fontFamily:
        Platform.OS === "ios"
          ? "Menlo"
          : "monospace",
    },

    keyword: {
      color: "#FF79C6",
      fontWeight: "700",
    },

    string: {
      color: "#F1FA8C",
    },

    comment: {
      color: "#6272A4",
      fontStyle: "italic",
    },
  });