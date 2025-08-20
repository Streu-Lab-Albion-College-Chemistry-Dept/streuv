import { TimeConfig, SessionTimeout } from "./types";

export function timeConfigToMs(config: TimeConfig): number {
  return (
    config.hours * 3600000 +
    config.minutes * 60000 +
    config.seconds * 1000
  );
}

export function computeTotalTimeout(duration: TimeConfig, delay: TimeConfig, cycles: number): number {
  return cycles * (timeConfigToMs(duration) + timeConfigToMs(delay));
}

export function createSessionTimeout(
  duration: TimeConfig,
  delay: TimeConfig,
  cycles: number,
  onExpire: () => void
): SessionTimeout {
  const timeoutMs = computeTotalTimeout(duration, delay, cycles);
  let expired = false;

  const timerId = setTimeout(() => {
    expired = true;
    onExpire();
  }, timeoutMs);

  return {
    timeoutMs,
    timerId,
    expired,
    cancel: () => {
      clearTimeout(timerId);
      expired = true;
    }
  };
}
