import { forwardRef, HTMLProps } from "react";

export interface VideoPlayerProps extends HTMLProps<HTMLVideoElement> {
  sourceUrl: string;
}

export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ sourceUrl, ...rest }, ref) => {
    return (
      <video ref={ref} {...rest}>
        <source src={sourceUrl} type="video/mp4" />
      </video>
    );
  }
);
