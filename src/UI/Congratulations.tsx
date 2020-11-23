import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { resultsSelector, sessionNameSelector } from '../QuestionsEngine';
import { localeSelector } from '../store';
import translations from '../translations';
import { capitalize } from '../util';
import Question from './Question';

const Name = styled.h2`
  font-size: 2rem;
  font-weight: 100;
  margin: 0 0 3rem;
  padding: 0 10%;
  line-height: 4rem;
  text-align: center;

  * {
    margin: 0;
    padding: 0;
  }

  @media only screen and (max-width: 720px) {
    font-size: 1.5rem;
    line-height: 3rem;
  }
`;

const Awesome = styled(Name)`
  font-size: 3rem;
  margin: 0;

  @media only screen and (max-width: 720px) {
    font-size: 2.25rem;
  }
`;

export default function Congratulations() {
  const locale = useSelector(localeSelector);
  const name = useSelector(sessionNameSelector);
  const results = useSelector(resultsSelector);

  const rightCount = results.filter(({ right, selected }) => selected === right).length;

  return (
    <>
      <Awesome>{capitalize(translations[locale].youreawesome)}</Awesome>
      <Name>
        {capitalize(translations[locale].congratulations)} {name}
      </Name>
      <Question>
        {capitalize(translations[locale].results)} ({rightCount.toString()}/10)
      </Question>
    </>
  );
}
