import { useRef } from "react";
import { Subject } from "rxjs";

export const usePlayerControls = () => {
  const controlsEvent = useRef({
    seekTo: new Subject<number>(),
    play: new Subject<void>(),
    pause: new Subject<void>(),
  });
  const emitSeekTo = (time: number) => {
    controlsEvent.current.seekTo.next(time);
  };
  const emitPlay = () => {
    controlsEvent.current.play.next();
  };
  const emitPause = () => {
    controlsEvent.current.pause.next();
  };
  return {
    controlsEvent,
    emitPause,
    emitSeekTo,
    emitPlay,
  };
};
