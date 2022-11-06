import { ButtonHTMLAttributes, memo, useMemo } from "react";
import styled from "styled-components";

export interface VideoControlsProps {
  isVideoPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onVolumeChange: () => void;
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
  const { isVideoPlaying, onStart, onPause, onVolumeChange } = props;

  const FirstButton = () => {
    if (isVideoPlaying)
      return <StopButton onClick={onPause} aria-label="stop video" />;
    return <PlayButton onClick={onStart} aria-label="start video" />;
  };
  return (
    <>
      <ButtonRow>
        <FirstButton />
      </ButtonRow>
    </>
  );
});
