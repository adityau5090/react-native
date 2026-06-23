import { View } from "react-native";

import {
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import TabButton from "./TabButton";
import { useTheme } from "@/hooks/useTheme";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colors = useTheme();

  return (
    <View
      style={{
        position: "absolute",

        left: 20,
        right: 20,
        bottom: 20,
      }}
    >
      <BlurView
        intensity={90}
        tint="dark"
        style={{
          height: 78,
          borderRadius: 40,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          overflow: "hidden",
          borderWidth: 3,

          borderColor: "rgba(255, 255, 255, 0.42)",
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      >
        {state.routes.map(
          (route, index) => {
            const focused =
              state.index === index;

            const onPress =
              () => {
                navigation.navigate(
                  route.name
                );
              };

            const icons: any = {
              index:
                "image-outline",

              folders:
                "folder-outline",

              private:
                "lock-closed-outline",

              settings:
                "settings-outline",
            };

            return (
              <TabButton
                key={route.key}
                focused={
                  focused
                }
                onPress={
                  onPress
                }
              >
                <Ionicons
                  name={
                    icons[
                      route.name
                    ]
                  }
                  size={26}
                  color={
                    focused
                      ? colors.primary
                      : colors.subText
                  }
                />
              </TabButton>
            );
          }
        )}
      </BlurView>
    </View>
  );
}