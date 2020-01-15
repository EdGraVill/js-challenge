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
  align-items: center;
  border: 2px solid #777;
  border-radius: 1.75rem;
  color: #777;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
`;

const Circle = styled.div`
  ${CircleBase}
`;

const CircleButton = styled.button<{ isSelected: boolean, status: boolean | null }>`
  ${CircleBase}
  ${({ isSelected, status }) => {
    let borderColor = isSelected ? '#4E5085' : '#777';
    if (status !== null) {
      borderColor = status ? '#00827250' : '#a4373a50';
    }

    return css`
      background-color: ${isSelected ? '#6264a7' : 'transparent'};
      border-color: ${borderColor};
      color: ${isSelected ? 'white' : '#777'};
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
