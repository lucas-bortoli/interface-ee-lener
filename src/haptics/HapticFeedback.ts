import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { timeout } from "../utils/timeout";

export async function hapticFeedbackControl() {
  await impactAsync(ImpactFeedbackStyle.Medium);
}

export async function hapticFeedbackProcessStart() {
  await impactAsync(ImpactFeedbackStyle.Heavy);
  await timeout(300);
  await impactAsync(ImpactFeedbackStyle.Heavy);
  await timeout(150);
  await impactAsync(ImpactFeedbackStyle.Heavy);
}

export async function hapticFeedbackProcessEnd() {
  await impactAsync(ImpactFeedbackStyle.Heavy);
  await timeout(300);
  await impactAsync(ImpactFeedbackStyle.Heavy);
  await timeout(150);
  await impactAsync(ImpactFeedbackStyle.Heavy);
  await timeout(400);
  await impactAsync(ImpactFeedbackStyle.Heavy);
}

export async function hapticFeedbackProcessError() {
  for (let i = 1; i <= 8; i++) {
    await impactAsync(ImpactFeedbackStyle.Heavy);
    await timeout(100);
    await impactAsync(ImpactFeedbackStyle.Heavy);
    await timeout(200);
  }
}