import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fromEvent, interval, Subscribable, Subscription } from "rxjs";
import styled from "styled-components";
import { useWindowDimensionsContext } from "../../helpers/useWindowDimensionsContext";
import { Bar } from "../Bar/Bar";
import { VideoControls } from "../VideoControls/VideoControls";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

const Wrap = styled.div`
  border: 1px solid red;
  padding: 10px;
  margin: 10px;
`;

interface VideoDataType {
  duration: number;
  isPlaying: boolean;
}

export const Player = () => {
  const playerInterval = 1000 / 60;
  const { width } = useWindowDimensionsContext();

  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const play = useCallback(() => {
    videoRef.current?.play();
  }, []);
  const stop = useCallback(() => {
    videoRef.current?.pause();
  }, []);
  const seekTo = (time: number) => {
    videoRef.current?.fastSeek(time);
  };
  const isPlaying = useMemo(() => videoData?.isPlaying || false, [videoData]);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const events = [
      fromEvent(videoRef.current, "loadeddata").subscribe(() => {
        if (videoRef.current?.readyState != 4) return;
        setVideoData({
          duration: video.duration,
          isPlaying: video.autoplay,
        });
        setCurrentTime(video.currentTime);
      }),
      fromEvent(videoRef.current, "play").subscribe(() => {
        console.log("play");
        setVideoData((data) => ({
          ...(data as VideoDataType),
          isPlaying: true,
        }));
      }),
      fromEvent(videoRef.current, "pause").subscribe(() => {
        setCurrentTime(video.currentTime);
        setVideoData((data) => ({
          ...(data as VideoDataType),
          isPlaying: false,
        }));
      }),
    ];
    return () => events.forEach((event) => event.unsubscribe());
  }, []);
  console.log(videoData);
  return (
    <>
      <Wrap>
        <VideoPlayer
          width={width / 2}
          ref={videoRef}
          sourceUrl="https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
        />
      </Wrap>
      <Wrap>
        <Bar videoRef={videoRef} intervalMs={playerInterval} />
      </Wrap>
      <Wrap>
        <VideoControls
          isVideoPlaying={isPlaying}
          onPause={stop}
          onStart={play}
          onVolumeChange={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Wrap>
    </>
  );
};
