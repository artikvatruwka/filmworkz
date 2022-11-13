import styled from "styled-components";
import { Player } from "./components/Player/Player";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
function App() {
  return (
    <AppWrapper>
      <Player />
    </AppWrapper>
  );
}

export default App;
