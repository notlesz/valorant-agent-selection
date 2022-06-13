import { useEffect, useState } from "react";

export const useVoiceAgent = () => {
  const [voice, setVoice] = useState<string>();

  const audio = new Audio(voice);
  audio.volume = 1;

  const play = () => audio.play();
  const pause = () => audio.pause();

  useEffect(() => {
    play();
  }, [voice]);
  return {
    setVoice,
    pause
  };
};
