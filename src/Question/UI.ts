import styled, { css } from "styled-components";

export const Page = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow-y: auto;
  width: 100vw;
`;

export const StepsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 3rem 0;
  max-width: 1024px;
  width: 100%;
`;

export const RoundButton = styled.button<{ isCurrent?: boolean }>`
  ${({ isCurrent, theme: { colors } }) => css`
    background-color: ${isCurrent ? colors.buttonActiveBackground : colors.buttonBackground};
    border: 2px solid ${colors.buttonBorder};
    border-radius: 1.2rem;
    cursor: pointer;
    user-select: none;
    min-height: 2.4rem;
    min-width: 2.4rem;

    & > span {
      color: ${isCurrent ? colors.buttonActiveColor : colors.buttonColor};
      font-size: 1.1rem;
      font-weight: bold;
    }

    &:disabled {
      cursor: default;
      opacity: .4;
    }
  `}
`;

export const ControlButtons = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin: 3rem 0;
  max-width: 512px;
  width: 100%;
`;

export const Button = styled(RoundButton)`
  border-radius: .84rem;
  padding: .36rem .84rem;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  margin: 0;
`;
