import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="battery">
        <NativeTabs.Trigger.Label>Battery</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          drawable='ic_battery'
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="network">
        <NativeTabs.Trigger.Label>Network</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          drawable="ic_menu_share"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="haptics">
        <NativeTabs.Trigger.Label>Haptics</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          drawable="ic_menu_compass"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
