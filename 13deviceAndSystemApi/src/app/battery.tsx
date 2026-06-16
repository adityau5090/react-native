import { ThemedText } from '@/components/themed-text';
import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';
import { Button, Platform, ScrollView } from 'react-native';

function stateLabel(state: Battery.BatteryState) {
  switch (state) {
    case Battery.BatteryState.CHARGING:
      return 'Charging';
    case Battery.BatteryState.FULL:
      return 'Full';
    case Battery.BatteryState.UNPLUGGED:
      return 'Unplugged';
    default:
      return 'Unknown';
  }
}

export default function BatteryScreen() {
  const level = Battery.useBatteryLevel();
  const state = Battery.useBatteryState();// give the status of battery 0=unknown, 1=unplugged, 2=charging, 3=full
  const lowPowerMode = Battery.useLowPowerMode();
  const powerState = Battery.usePowerState();
  
  const [available, setAvailable] = useState<boolean | null>(null);
  const [optimization, setOptimization] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    Battery.isAvailableAsync().then(setAvailable);
    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setEvents((current) =>
        [`Level: ${Math.round(batteryLevel * 100)}%`, ...current].slice(0, 4),
      );
    });
    const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
      setEvents((current) =>
        [`State: ${stateLabel(batteryState)}`, ...current].slice(0, 4),
      );
    });
    const powerSub = Battery.addLowPowerModeListener(({ lowPowerMode: enabled }) => {
      setEvents((current) =>
        [`Low power: ${enabled ? 'On' : 'Off'}`, ...current].slice(0, 4),
      );
    });
    return () => {
      levelSub.remove();
      stateSub.remove();
      powerSub.remove();
    };
  }, []);

  const refreshPowerState = async () => {
    const result = await Battery.getPowerStateAsync();
    setStatus(
      `Power state: ${Math.round(result.batteryLevel * 100)}% · ${stateLabel(result.batteryState)} · low power ${result.lowPowerMode ? 'on' : 'off'}`,
    )
    };

  const refreshOptimization = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Battery optimization check is Android-only.');
      return;
    }
    const enabled = await Battery.isBatteryOptimizationEnabledAsync();
    setOptimization(enabled);
    setStatus(enabled ? 'Battery optimization is ON' : 'Battery optimization is OFF');
  };
  
  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>Battery</ThemedText>
      <ThemedText>Available: {available === null ? '…' : available ? 'Yes' : 'No'}</ThemedText>
      <ThemedText>Level: {level < 0 ? 'Unavailable' : `${Math.round(level * 100)}%`}</ThemedText>
      <ThemedText>State: {stateLabel(state)}</ThemedText>
      <ThemedText>Low power mode: {lowPowerMode ? 'On' : 'Off'}</ThemedText>
      <ThemedText>
        Hook bundle: {Math.round(powerState.batteryLevel * 100)}% ·{' '}
        {stateLabel(powerState.batteryState)}
      </ThemedText>
      <Button title="Refresh power state" onPress={refreshPowerState} />
      {Platform.OS === 'android' && (
        <Button title="Check battery optimization" onPress={refreshOptimization} />
      )}
      {optimization !== null && (
        <ThemedText>Optimization enabled: {optimization ? 'Yes' : 'No'}</ThemedText>
      )}
      {status && <ThemedText>{status}</ThemedText>}
      <ThemedText style={{ fontWeight: '600', marginTop: 8 }}>Recent events</ThemedText>
      {events.length === 0 ? (
        <ThemedText>No changes yet.</ThemedText>
      ) : (
        events.map((event, index) => <ThemedText key={index}>{event}</ThemedText>)
      )}
    </ScrollView>
  );
}