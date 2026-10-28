import { useCallback, useEffect, useState } from "react";

interface UseSpeechSynthesisOptions {
  lang?: string;
  rate?: number;
}

interface SpeakOptions {
  onError?: (message: string) => void;
}

export function useSpeechSynthesis({
  lang = "en-US",
  rate = 0.9,
}: UseSpeechSynthesisOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (
        !text.trim() ||
        typeof window === "undefined" ||
        !("speechSynthesis" in window) ||
        !("SpeechSynthesisUtterance" in window)
      ) {
        options?.onError?.("Speech synthesis is not supported.");
        return;
      }

      const synthesis = window.speechSynthesis;

      synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = lang;
      utterance.rate = rate;

      utterance.onstart = () => setIsSpeaking(true);

      utterance.onend = () => setIsSpeaking(false);

      utterance.onerror = (event) => {
        setIsSpeaking(false);

        if (event.error !== "canceled" && event.error !== "interrupted") {
          options?.onError?.("Unable to play pronunciation.");
        }
      };

      synthesis.speak(utterance);
    },
    [lang, rate],
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const isSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;

  return {
    speak,
    stop,
    isSupported,
    isSpeaking,
  };
}
