import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { fromEvent, interval, Observable, Subscription } from "rxjs";
import styled from "styled-components";
import { usePlayerControls } from "../../helpers/usePlayerControlls";
import { VideoPlayerProps } from "../VideoPlayer/VideoPlayer";

interface BarComponentProps {
  percentage: number;
  interval: number;
}

const BarComponent = styled.div<BarComponentProps>`
  cursor: pointer;
  width: 100%;
  height: 4px;
  background: red;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.percentage}%;
    height: 4px;
    background: blue;
    display: block;
    transition: width ${(props) => props.interval}ms linear;
  }
`;

const Timer = styled.span`
  text-align: center;
  width: 100%;
  display: block;
`;

interface BarProps {
  controlsEvent: ReturnType<typeof usePlayerControls>["controlsEvent"];
  onSeek: (time: number) => void;
  duration: number;
  intervalMs: number;
}
export const Bar = ({
  onSeek,
  duration,
  intervalMs,
  controlsEvent,
}: BarProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [paused, setPaused] = useState(true);
  const timestampRef = useRef<number>();
  const startingTimeRef = useRef<number>();
  const updateIntervalSubscriptionRef = useRef<Subscription>();

  useEffect(() => {
    const events = [
      controlsEvent.current.play.subscribe(() => {
        timestampRef.current = Date.now();
        startingTimeRef.current = Date.now();
        setTimerActive(true);
        setPaused(false);
      }),
      controlsEvent.current.pause.subscribe(() => {
        timestampRef.current = Date.now();
        startingTimeRef.current = Date.now();
        setTimerActive(false);
        setPaused(true);
      }),
      controlsEvent.current.seekTo.subscribe((time) => {
        timestampRef.current = Date.now();
        startingTimeRef.current = Date.now();
        setTimerActive(false);
        setTimeout(() => {
          setTimerActive(true);
        });
        setCurrentTime(time);
      }),
    ];
    return () => {
      events.forEach((event) => event.unsubscribe());
    };
  }, []);

  useEffect(() => {
    if (timerActive && !paused && timestampRef.current != null) {
      updateIntervalSubscriptionRef.current = interval(intervalMs).subscribe(
        () => {
          setCurrentTime(
            timestampRef.current! - startingTimeRef.current! + currentTime
          );
          timestampRef.current = Date.now();
        }
      );
    } else {
      updateIntervalSubscriptionRef.current?.unsubscribe();
    }
    return () => {
      updateIntervalSubscriptionRef.current?.unsubscribe();
    };
  }, [timerActive, paused]);

  return (
    <>
      <Timer>
        {new Date(currentTime).toISOString().substring(11, 23)} /{" "}
        {new Date(duration).toISOString().substring(11, 23)}
      </Timer>
      <BarComponent
        onClick={(event) => {
          const barPercentage =
            (event.clientX - event.currentTarget.offsetLeft) /
            event.currentTarget.offsetWidth;
          setCurrentTime(barPercentage * duration);
          onSeek(barPercentage * duration);
        }}
        percentage={(currentTime * 100) / duration}
        interval={intervalMs}
      />
    </>
  );
};
