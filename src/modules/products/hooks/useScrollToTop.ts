import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

const SCROLL_THRESHOLD = 300;

export function useScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowTopBtn(e.nativeEvent.contentOffset.y > SCROLL_THRESHOLD);
  };

  return { showTopBtn, handleScroll };
}
