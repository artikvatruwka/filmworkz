import styled from "styled-components";
import { Player } from "./components/Player/Player";
import { WindowDimensionsContextProvider } from "./helpers/useWindowDimensionsContext";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
function App() {
  return (
    <WindowDimensionsContextProvider>
      <AppWrapper>
        <Player />
      </AppWrapper>
    </WindowDimensionsContextProvider>
  );
}

export default App;
