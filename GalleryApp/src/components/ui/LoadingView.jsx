import { ActivityIndicator, View } from "react-native";
import {useTheme} from "@/hooks/useTheme"

export function LoadingView() {
    const colors = useTheme();

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
    )
}