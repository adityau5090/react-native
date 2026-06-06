import {
  getXP,
  saveXP,
} from "@/storage/xpStorage";

export async function addXP(
  amount: number
) {
  const current =
    await getXP();

  const updated =
    current + amount;

  await saveXP(
    updated
  );

  return updated;
}