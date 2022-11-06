import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
const WindowDimensionsContext = createContext<{
  width: number;
  height: number;
}>({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const WindowDimensionsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);
  return (
    <WindowDimensionsContext.Provider value={windowSize}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};

export const useWindowDimensionsContext = () =>
  useContext(WindowDimensionsContext);
