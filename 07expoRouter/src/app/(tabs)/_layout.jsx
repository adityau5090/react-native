// import { Tabs } from "expo-router";

// export default function RootLayout() {
//   const isProtected = true
//   return (<Tabs/>)
// }

import { NativeTabs } from "expo-router/build/native-tabs";

export default function TabLayout(){
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
            </NativeTabs.Trigger>

            {/* <NativeTabs.Trigger name="setting">
                <NativeTabs.Trigger.Label>Setting</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="gear" md="setting" />
            </NativeTabs.Trigger> */}
        </NativeTabs>
    )
}