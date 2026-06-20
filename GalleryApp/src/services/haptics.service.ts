import * as Haptics from "expo-haptics"

export async function selectionHaptic() {
  await Haptics.selectionAsync();
}

export async function mediumImpact() {
  await Haptics.impactAsync(
    Haptics.ImpactFeedbackStyle.Medium
  );
}

export async function heavyImpact() {
  await Haptics.impactAsync(
    Haptics.ImpactFeedbackStyle.Heavy
  );
}

export async function successHaptic() {
  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );
}

export async function errorHaptic() {
  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Error
  );
}