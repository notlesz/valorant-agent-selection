import { useEffect, useState } from "react";

export const useVoiceAgent = () => {
  const [voice, setVoice] = useState<string>();
  const [isPlayed, setIsPlayed] = useState<boolean>(false);

  const audio = new Audio(voice);
  audio.volume = 0.5;

  const play = () => audio.play();

  useEffect(() => {
    play();
  }, [voice]);
  return {
    setVoice,
  };
};
