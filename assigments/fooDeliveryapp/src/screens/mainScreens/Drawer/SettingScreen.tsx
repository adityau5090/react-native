import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SettingItem = ({ title, rightComponent, onPress } : any) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.itemText}>{title}</Text>
    {rightComponent}
  </TouchableOpacity>
);

export default function SettingScreen() {
  const [isEnabled, setIsEnabled] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Section: Account */}
      <Text style={styles.section}>Account</Text>
      <SettingItem title="Profile" />
      <SettingItem title="Change Password" />
      <SettingItem title="Privacy" />

      {/* Section: Preferences */}
      <Text style={styles.section}>Preferences</Text>
      <SettingItem
        title="Dark Mode"
        rightComponent={
          <Switch
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
          />
        }
      />
      <SettingItem title="Notifications" />

      {/* Section: About */}
      <Text style={styles.section}>About</Text>
      <SettingItem title="Terms & Conditions" />
      <SettingItem title="App Version" rightComponent={<Text>1.0.0</Text>} />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  section: {
    color: '#94A3B8',
    marginTop: 20,
    marginBottom: 8,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  item: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutBtn: {
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});