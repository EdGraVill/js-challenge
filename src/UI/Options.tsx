import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import styled, { css } from 'styled-components';
import gfm from 'remark-gfm';
import { inlineCodeStyle } from './Code';
import { useSelector } from 'react-redux';
import { isRTLSelector } from '../store';

const OptionList = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: 3rem 0;
  width: 100%;

  & > div {
    align-items: stretch;
    display: flex;
    flex-flow: column nowrap;
  }
`;

const Option = styled.button<{ isRight?: boolean, isRTL: boolean, isSelected?: boolean, letter: string }>`
  ${({ isRight, isRTL, isSelected, letter, theme: { colors, fonts } }) => css`
    background: transparent;
    border: 1px solid ${colors.buttonBackground};
    border-radius: ${isRTL ? '.3rem 0 0 .3rem' : '0 .3rem .3rem 0'};
    font-size: 1.1rem;
    line-height: 1.8rem;
    margin: ${isRTL ? '.75rem 3rem .75rem 0' : '.75rem 0 .75rem 3rem'};
    max-width: calc(95vw - 5rem);
    min-height: 3rem;
    min-width: 50vw;
    padding: .5rem 2.25rem;
    position: relative;
    text-align: center;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    &:hover {
      cursor: pointer;

      &::before {
        color: ${colors.buttonActiveColor};
      }
    }

    & p {
      margin: 0;
    }

    & code {
      ${inlineCodeStyle}
      white-space: normal;
    }

    &::after {
      content: '${isRight ? '✓' : '⨉'}';
      display: ${isSelected ? 'initial' : 'none'};
      color: ${isRight ? colors.buttonRight : colors.buttonWrong};
      font-size: 2rem;
      position: absolute;
      ${isRTL ? 'left' : 'right'}: .5rem;
      top: calc(50% - 1rem);
    }

    &::before {
      align-items: center;
      background-color: ${colors.buttonBackground};
      border-radius: ${isRTL ? '0 .75rem .75rem 0' : '.75rem 0 0 .75rem'};
      box-sizing: border-box;
      color: white;
      content: '${letter}:';
      display: flex;
      font-family: ${fonts.code};
      height: calc(100% + .1rem);
      justify-content: center;
      position: absolute;
      ${isRTL ? 'right' : 'left'}: -3rem;
      width: 3rem;
      text-align: center;
      top: -.05rem;
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: .5;

      &:hover {
        &::before {
          color: white;
        }
      }
    }

    ${(isSelected) && css`
      &:disabled {
        opacity: 1;
      }
    `}

    ${isSelected && css`
      border: 1px solid ${colors.buttonWrong};
      &::before {
        background-color: ${colors.buttonWrong};
      }
    `}

    ${isRight && css`
      border: 1px solid ${colors.buttonRight};
      &::before {
        background-color: ${colors.buttonRight};
        color: #323643;
      }
    `}

    &:focus {
      outline: none;
    }
  `}
`;

interface Props {
  onSelecteOption(index: number): void;
  options: string[];
  rightOption?: number;
  selectedOption?: number;
}

const Options: React.FC<Props> = ({ onSelecteOption, options, rightOption, selectedOption }) => {
  const isRTL = useSelector(isRTLSelector);

  const onPress = React.useCallback((ix: number) => () => {
    if (!selectedOption) {
      onSelecteOption(ix);
    }
  }, [onSelecteOption, selectedOption]);

  return (
    <OptionList>
      <div>
        {options.map((option, ix) => (
          <Option
            disabled={typeof selectedOption === 'number'}
            isRight={typeof rightOption === 'number' ? rightOption === ix : undefined}
            isRTL={isRTL}
            isSelected={typeof selectedOption === 'number' ? selectedOption === ix : undefined}
            key={option}
            letter={String.fromCharCode(ix + 65)}
            onClick={onPress(ix)}
          >
            <ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>{option}</ReactMarkdown>
          </Option>
        ))}
      </div>
    </OptionList>
  );
};

export default Options;
