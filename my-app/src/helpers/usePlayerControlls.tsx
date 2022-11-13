import { useRef } from "react";
import { Subject } from "rxjs";

export const usePlayerControls = () => {
  const controlsEvent = useRef({
    bothVideosLoaded: new Subject<{ duration: number }>(),
    seekTo: new Subject<number>(),
    play: new Subject<void>(),
    pause: new Subject<void>(),
    syncAt: new Subject<number>(),
  });
  const emitBothVideosLoaded = (data: { duration: number }) => {
    controlsEvent.current.bothVideosLoaded.next(data);
  };
  const emitSeekTo = (time: number) => {
    controlsEvent.current.seekTo.next(time);
  };
  const emitPlay = () => {
    controlsEvent.current.play.next();
  };
  const emitPause = () => {
    controlsEvent.current.pause.next();
  };
  const emitSyncAt = (time: number) => {
    controlsEvent.current.syncAt.next(time);
  };
  return {
    controlsEvent,
    emitBothVideosLoaded,
    emitPause,
    emitSeekTo,
    emitPlay,
    emitSyncAt,
  };
};
