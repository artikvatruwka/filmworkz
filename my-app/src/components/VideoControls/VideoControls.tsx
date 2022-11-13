import {
  ButtonHTMLAttributes,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { usePlayerControls } from "../../helpers/usePlayerControlls";

export interface VideoControlsProps {
  controlsEvent: ReturnType<typeof usePlayerControls>["controlsEvent"];
  onPlay: () => void;
  onPause: () => void;
}

const EmojiButton = styled.button`
  font-size: 32px;
  background: transparent;
  height: 48px;
  width: 48px;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: none;
  cursor: pointer;
  &:hover {
    filter: brightness(0.5);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlayButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <EmojiButton {...props}>▶️</EmojiButton>
);
const StopButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <EmojiButton {...props}>⏸</EmojiButton>
);

export const VideoControls = memo((props: VideoControlsProps) => {
  const { onPlay, onPause, controlsEvent } = props;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const events = [
      controlsEvent.current.pause.subscribe(() => {
        setIsVideoPlaying(false);
      }),
      controlsEvent.current.play.subscribe(() => {
        setIsVideoPlaying(true);
      }),
    ];
    return () => events.forEach((event) => event.unsubscribe());
  }, []);

  controlsEvent.current.pause.subscribe();
  const FirstButton = () => {
    if (isVideoPlaying)
      return <StopButton onClick={onPause} aria-label="stop video" />;
    return <PlayButton onClick={onPlay} aria-label="start video" />;
  };
  return (
    <>
      <ButtonRow>
        <FirstButton />
      </ButtonRow>
    </>
  );
});
