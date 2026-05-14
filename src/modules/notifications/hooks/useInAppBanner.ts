import { useCallback, useRef, useState } from "react";

export interface BannerPayload {
  id: string;
  title: string;
  body?: string;
}

export function useInAppBanner() {
  const [active, setActive] = useState<BannerPayload | null>(null);
  const queue = useRef<BannerPayload[]>([]);
  // Track active in a ref so push() never has a stale closure
  const activeRef = useRef<BannerPayload | null>(null);

  const showNext = useCallback(() => {
    const next = queue.current.shift() ?? null;
    activeRef.current = next;
    setActive(next);
  }, []);

  const push = useCallback((payload: Omit<BannerPayload, "id">) => {
    const banner: BannerPayload = {
      id: `${Date.now()}-${Math.random()}`,
      ...payload,
    };

    if (activeRef.current) {
      // Something already visible — queue it
      queue.current.push(banner);
    } else {
      activeRef.current = banner;
      setActive(banner);
    }
  }, []); // no deps — reads activeRef, never stale

  const dismiss = useCallback(() => {
    activeRef.current = null;
    showNext();
  }, [showNext]);

  return { active, push, dismiss };
}
