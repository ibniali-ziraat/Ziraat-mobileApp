export function tokenExpiryCheck(
  exp: string | number | undefined | null
): Date | null {
  if (exp == null) return null;

  if (typeof exp === "number") {
    const ms = exp < 1e12 ? exp * 1000 : exp;
    return new Date(ms);
  }

  const num = Number(exp);
  if (!Number.isNaN(num)) {
    const ms = num < 1e12 ? num * 1000 : num;
    return new Date(ms);
  }

  const d = new Date(exp);
  return isNaN(d.getTime()) ? null : d;
}

type CancelFn = () => void;

export function scheduleAutoLogout(
  exp: string | number | undefined | null,
  onLogout: () => void,
  onRedirect: () => void
): CancelFn {
  const MAX_TIMEOUT = 2 ** 31 - 1;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let cancelled = false;

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer as any);
      timer = null;
    }
  }

  function scheduleOnce() {
    if (cancelled) return;

    const expDate = tokenExpiryCheck(exp);
    if (!expDate) {
      // No expiry found — nothing to schedule
      return;
    }

    const now = Date.now();
    const msUntilExpiry = expDate.getTime() - now;

    if (msUntilExpiry <= 0) {
      onLogout();
      onRedirect();
      return;
    }

    // If the delay is larger than the max safe timeout, schedule a MAX chunk
    if (msUntilExpiry > MAX_TIMEOUT) {
      timer = setTimeout(() => {
        timer = null;
        scheduleOnce();
      }, MAX_TIMEOUT);
      return;
    }

    timer = setTimeout(() => {
      timer = null;
      onLogout();
      onRedirect();
    }, msUntilExpiry);
  }

  scheduleOnce();

  return () => {
    cancelled = true;
    clearTimer();
  };
}
