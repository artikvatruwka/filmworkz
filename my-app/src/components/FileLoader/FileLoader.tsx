import { useState } from "react";
import styled from "styled-components";
import { Switch } from "../Switch/Switch";

interface FileLoaderProps {
  getVideo: (url: string) => void;
}

const FileLoaderWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

export const FileLoader = ({ getVideo }: FileLoaderProps) => {
  const [videoInputSource, setVideoInputSource] = useState<"file" | "url">(
    "file"
  );
  const [loadedUrlFromFile, setLoadedUrlFromFile] = useState("");
  const [urlFromPrompt, setUrlFromPrompt] = useState("");

  const handleSubmit = () => {
    if (videoInputSource === "file") return getVideo(loadedUrlFromFile);
    if (videoInputSource === "url") return getVideo(urlFromPrompt);
  };

  return (
    <FileLoaderWrapper>
      <Switch
        active={videoInputSource === "url"}
        text1="file"
        text2="url"
        onPress={() => {
          setVideoInputSource(videoInputSource === "file" ? "url" : "file");
        }}
      />
      {videoInputSource === "file" ? (
        <input
          type="file"
          accept=".mp4,.ogg,.webm"
          onChange={(e) => {
            setLoadedUrlFromFile(URL.createObjectURL(e.target.files![0]));
          }}
        />
      ) : null}
      {videoInputSource === "url" ? (
        <input type="text" onChange={(e) => setUrlFromPrompt(e.target.value)} />
      ) : null}
      <button onClick={handleSubmit}>Submit selected url or file</button>
    </FileLoaderWrapper>
  );
};
