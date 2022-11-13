import styled from "styled-components";

export interface SwitchProps {
  active: boolean;
  onPress: () => void;
  text1: string;
  text2: string;
}

export const SwitchBackground = styled.div`
  width: 128px;
  height: 32px;
  background: #f00;
  position: relative;
  display: flex;
  border-radius: 32px;
  cursor: pointer;
`;

export const SwitchButton = styled.button<{ offset: string }>`
  position: absolute;
  width: 64px;
  height: 32px;
  box-sizing: border-box;
  background: transparent;
  backdrop-filter: hue-rotate(120deg);
  border: 7px solid #008a00;
  border-radius: 32px;
  z-index: 1;
  left: ${(props) => props.offset};
  transition: left 0.1s ease-in-out;
  cursor: pointer;
`;

export const SwitchTextBehind = styled.span`
  width: 64px;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export const Switch = (props: SwitchProps) => {
  return (
    <SwitchBackground onClick={props.onPress}>
      <SwitchButton offset={props.active ? "50%" : "0"} />
      <SwitchTextBehind>{props.text1}</SwitchTextBehind>
      <SwitchTextBehind>{props.text2}</SwitchTextBehind>
    </SwitchBackground>
  );
};
