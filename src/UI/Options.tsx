import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import styled, { css } from 'styled-components';
import gfm from 'remark-gfm';
import { inlineCodeStyle } from './Code';
import { useDispatch, useSelector } from 'react-redux';
import { isRTLSelector } from '../store';
import { questionsActions, questionSelector } from '../QuestionsEngine';

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

const Option = styled.button<{ isRight?: boolean; isRTL: boolean; isSelected?: boolean; letter: string }>`
  ${({ isRight, isRTL, isSelected, letter, theme: { colors, fonts } }) => css`
    background: transparent;
    border: 1px solid ${colors.optionBackground};
    border-radius: ${isRTL ? '.3rem 0 0 .3rem' : '0 .3rem .3rem 0'};
    font-size: 1.1rem;
    line-height: 1.8rem;
    margin: ${isRTL ? '.75rem 3rem .75rem 0' : '.75rem 0 .75rem 3rem'};
    max-width: calc(95vw - 5rem);
    min-height: 3rem;
    min-width: 600px;
    padding: 0.5rem 2.25rem;
    position: relative;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    @media only screen and (max-width: 720px) {
      min-width: 60vw;
    }

    &:hover {
      cursor: pointer;

      &::before {
        color: ${colors.optionActiveColor};
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
      color: ${isRight ? colors.optionRight : colors.optionWrong};
      font-size: 2rem;
      position: absolute;
      ${isRTL ? 'left' : 'right'}: .5rem;
      top: calc(50% - 1rem);
    }

    &::before {
      align-items: center;
      background-color: ${colors.optionBackground};
      border-radius: ${isRTL ? '0 .75rem .75rem 0' : '.75rem 0 0 .75rem'};
      box-sizing: border-box;
      color: white;
      content: '${letter}:';
      display: flex;
      font-family: ${fonts.code};
      height: calc(100% + 0.1rem);
      justify-content: center;
      position: absolute;
      ${isRTL ? 'right' : 'left'}: -3rem;
      width: 3rem;
      text-align: center;
      top: -0.05rem;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;

      &:hover {
        &::before {
          color: white;
        }
      }
    }

    ${isSelected &&
    css`
      &:disabled {
        opacity: 1;
      }
    `}

    ${isSelected &&
    css`
      border: 1px solid ${colors.optionWrong};
      &::before {
        background-color: ${colors.optionWrong};
      }
    `}

    ${isRight &&
    css`
      border: 1px solid ${colors.optionRight};
      &::before {
        background-color: ${colors.optionRight};
        color: #323643;
      }
    `}

    &:focus {
      outline: none;
    }
  `}
`;

export default function Options() {
  const dispatch = useDispatch();
  const question = useSelector(questionSelector);
  const isRTL = useSelector(isRTLSelector);

  const onPress = React.useCallback(
    (ix: number) => () => {
      if (!question.result?.selected) {
        dispatch(questionsActions.answer(ix));
      }
    },
    [dispatch, question.result],
  );

  const rightOption = question.result?.right;
  const selectedOption = question.result?.selected;

  return (
    <OptionList>
      <div>
        {question.options.map((option, ix) => (
          <Option
            disabled={typeof selectedOption === 'number'}
            isRight={typeof rightOption === 'number' ? rightOption === ix : undefined}
            isRTL={isRTL}
            isSelected={typeof selectedOption === 'number' ? selectedOption === ix : undefined}
            key={option}
            letter={String.fromCharCode(ix + 65)}
            onClick={onPress(ix)}
          >
            <ReactMarkdown key={ix} plugins={[gfm]} allowDangerousHtml>
              {option}
            </ReactMarkdown>
          </Option>
        ))}
      </div>
    </OptionList>
  );
}
