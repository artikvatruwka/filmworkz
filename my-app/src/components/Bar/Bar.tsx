import { forwardRef, RefObject, useEffect, useState } from "react";
import { fromEvent, interval, Subscription } from "rxjs";
import styled from "styled-components";
import { VideoPlayerProps } from "../VideoPlayer/VideoPlayer";

interface BarComponentProps {
  percentage: number;
  interval: number;
}

const BarComponent = styled.div<BarComponentProps>`
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

interface BarProps {
  videoRef: RefObject<HTMLVideoElement>;
  intervalMs: number;
}
export const Bar = ({ videoRef, intervalMs }: BarProps) => {
  const [duration, setDuration] = useState(videoRef.current?.duration || 0);
  const [currentTime, setCurrentTime] = useState(
    videoRef.current?.currentTime || 0
  );

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    let updateCurrentTimeInterval: Subscription;
    const events = [
      fromEvent(video, "loadeddata").subscribe(() => {
        if (video?.readyState != 4) return;
        setDuration(video.duration);
        setCurrentTime(video.currentTime);
      }),
      fromEvent(video, "play").subscribe(() => {
        setCurrentTime(video.currentTime);
        updateCurrentTimeInterval = interval(intervalMs).subscribe(() => {
          setCurrentTime(video.currentTime);
        });
      }),
      fromEvent(video, "pause").subscribe(() => {
        setCurrentTime(video.currentTime);
        updateCurrentTimeInterval.unsubscribe();
      }),
    ];

    return () => events.forEach((event) => event.unsubscribe());
  }, []);

  return (
    <>
      {new Date(currentTime * 1000).toISOString().substring(11, 23)}
      <BarComponent
        percentage={(currentTime * 100) / duration}
        interval={intervalMs}
      />
    </>
  );
};
