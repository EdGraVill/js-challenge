import * as React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 0 0 1rem;
  width: 100%;
`;

const CircleBase = css`
  ${({ theme: { fonts } }: { theme: Theme }) => css`
    align-items: center;
    border: 2px solid #777;
    border-radius: 1.75rem;
    color: #777;
    display: flex;
    font-family: ${fonts.titles};
    font-size: 1.1rem;
    justify-content: center;
    margin: 0 .3rem;
    padding: 0;
    min-width: 2.5rem;
    height: 2.5rem;

    @media screen and (max-width: 480px) {
      font-size: .8rem;
      height: 1.3rem;
      min-width: 1.3rem;
      margin: 0 .2rem;
    }
  `}
`;

const Circle = styled.div`
  ${CircleBase}
`;

const CircleButton = styled.button`
  ${CircleBase}
  ${({ isSelected, status, theme: { colors } }: { isSelected: boolean, status: boolean | null, theme: Theme }) => {
    let borderColor = isSelected ? colors.primaryDark : colors.gray;
    if (status !== null) {
      borderColor = status ? `${colors.right}50` : `${colors.wrong}50`;
    }

    return css`
      background-color: ${isSelected ? colors.primary : colors.transparent};
      border-color: ${borderColor};
      color: ${isSelected ? 'white' : colors.gray};
      cursor: pointer;
      font-weight: bold;
    `;
  }}

  &:focus {
    outline: none;
  }
`;

interface BreadcrumbsProps {
  currentQuestion: number;
  goTo: (step: number) => () => void;
  safeAnswers: Answer[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentQuestion, goTo, safeAnswers }) => {
  return <Container>
    {Array(10).fill(null).map((_, ix) => {
      const isAvailable = ix === 0 || safeAnswers[ix - 1][1] !== null;
      const isSelected = ix === currentQuestion;
      const status: boolean | null = safeAnswers[ix][2];

      if (isAvailable) {
        return <CircleButton key={ix} isSelected={isSelected} onClick={goTo(ix)} status={status}>{ix + 1}</CircleButton>
      }
      
      return <Circle key={ix}>{ix + 1}</Circle>
    })}
    {safeAnswers.filter(([id, selected]) => selected !== null).length === 10 && (
      <CircleButton isSelected={currentQuestion === 10} onClick={goTo(10)} status={null}>
        <span style={{ padding: '0 .5rem' }}>Sumary</span>
      </CircleButton>
    )}
  </Container>
};

export default Breadcrumbs;
