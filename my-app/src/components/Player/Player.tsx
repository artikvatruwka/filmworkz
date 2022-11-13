import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import styled from "styled-components";
import { usePlayerControls } from "../../helpers/usePlayerControlls";
import { Bar } from "../Bar/Bar";
import { FileLoader } from "../FileLoader/FileLoader";
import { VideoControls } from "../VideoControls/VideoControls";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

const Wrap = styled.div`
  padding: 12px;
`;

interface VideoDataType {
  duration: number;
  isPlaying: boolean;
}

const TwoVideosContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const PlayerComponent = ({
  videoUrl,
  setVideoUrl,
}: {
  videoUrl: string;
  setVideoUrl: Dispatch<SetStateAction<string>>;
}) => {
  const playerInterval = 1000 / 60;
  const { controlsEvent, emitPause, emitPlay, emitSeekTo } =
    usePlayerControls();

  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTwoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const bothVideosLoaded = () => {
      if (
        videoRef.current?.readyState == 4 &&
        videoTwoRef.current?.readyState == 4
      ) {
        setVideoData({ duration: videoRef.current.duration, isPlaying: false });
      }
    };

    const seekVideos = (timeMs: number) => {
      videoRef.current!.currentTime = timeMs / 1000;
      videoTwoRef.current!.currentTime = timeMs / 1000;
    };

    const playVideos = () => {
      videoRef.current!.play();
      videoTwoRef.current!.play();
      videoRef.current!.currentTime = videoTwoRef.current!.currentTime;
    };

    const pauseVideos = () => {
      videoRef.current!.pause();
      videoTwoRef.current!.pause();
      videoRef.current!.currentTime = videoTwoRef.current!.currentTime;
    };

    const events = [
      fromEvent(videoRef.current!, "canplaythrough").subscribe(() => {
        bothVideosLoaded();
      }),

      controlsEvent.current.play.subscribe(playVideos),
      controlsEvent.current.pause.subscribe(pauseVideos),
      controlsEvent.current.seekTo.subscribe(seekVideos),
    ];
    return () => events.forEach((event) => event.unsubscribe());
  }, []);

  return (
    <>
      <Wrap>
        <TwoVideosContainer>
          <VideoPlayer width="100%" ref={videoRef} sourceUrl={videoUrl} />
          <VideoPlayer width="100%" ref={videoTwoRef} sourceUrl={videoUrl} />
        </TwoVideosContainer>
      </Wrap>
      <Wrap>
        <VideoControls
          controlsEvent={controlsEvent}
          onPlay={emitPlay}
          onPause={emitPause}
        />
        <div>
          <Bar
            onSeek={emitSeekTo}
            intervalMs={playerInterval}
            controlsEvent={controlsEvent}
            duration={Math.floor((videoData?.duration || 0) * 1000)}
          />
        </div>
      </Wrap>
      <Wrap>
        <h1>Video upload</h1>
        <FileLoader
          getVideo={(url) => {
            setVideoUrl(url);
          }}
        />
      </Wrap>
    </>
  );
};
export const Player = () => {
  const [videoUrl, setVideoUrl] = useState<string>(
    "http://localhost:3000/videoplayback.mp4"
  );
  return (
    <PlayerComponent
      videoUrl={videoUrl}
      setVideoUrl={setVideoUrl}
      key={videoUrl}
    />
  );
};
