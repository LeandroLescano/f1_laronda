import {Icon, PauseCircleIcon, PlayCircleIcon} from "lucide-react";
import React, {useRef, useState} from "react";

const AudioPlayer = ({src}: {src: string}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0); // Estado para la posición de la barra de progreso
  const [duration, setDuration] = useState(0); // Duración total del audio

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const totalDuration = audioRef.current.duration;
      setProgress((currentTime / totalDuration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration); // Guardar la duración del audio al cargar
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (Number(event.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(Number(event.target.value));
    }
  };

  return (
    <div className="flex flex-row items-center flex-start gap-2">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>

      <button onClick={handlePlayPause}>
        {audioRef.current?.paused ? (
          <PlayCircleIcon size={30} />
        ) : (
          <PauseCircleIcon size={30} />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="drag_input w-[200px]"
      />
    </div>
  );
};

export default AudioPlayer;
