import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historySelector, questionsActions, sessionNameSelector } from '../QuestionsEngine';
import { globalActions, isRTLSelector, localeSelector } from '../store';
import content from '../questions.json';
import styled, { css } from 'styled-components';
import translations from '../translations';
import { capitalize } from '../util';
import { Button, HistoryChart } from '../UI';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const Input = styled.input`
  ${({ theme: { colors } }) => css`
    background-color: transparent;
    border: 0;
    border-bottom: 3px solid ${colors.inlineCodeBackground};
    color: ${colors.text};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${colors.inlineCodeBackground};
    }
  `}
`;

const Select = styled.select<{ isRTL: boolean }>`
  ${({ isRTL, theme: { colors } }) => css`
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%), linear-gradient(to right, gray 50%, gray 50%);
    background-position: ${isRTL
      ? `
        calc(12px) calc(1rem + 1px),
        calc(17px) calc(1rem + 1px),
        calc(2rem) 0.4rem;
      `
      : `
        calc(100% - 15px) calc(1rem + 2px),
        calc(100% - 10px) calc(1rem + 2px),
        calc(100% - 2rem) 0.4rem;
      `};
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    appearance: none;
    background-color: ${colors.inlineCodeBackground};
    border: 0;
    border-radius: 0.3rem;
    color: ${colors.inlineCodeColor};
    cursor: pointer;
    direction: ${isRTL ? 'rtl' : 'ltr'};
    font-size: 1.1rem;
    margin-bottom: 2rem;
    padding: ${isRTL ? '.5rem 1rem .5rem 3rem' : '.5rem 3rem .5rem 1rem'};
    position: relative;
    text-align: center;
    text-align-last: center;

    &:focus {
      outline: none;
    }
  `}
`;

const onChangeValue = (setter: React.Dispatch<React.SetStateAction<string>>) => (
  event: React.ChangeEvent<HTMLInputElement>,
) => setter(event.currentTarget.value);

const WelcomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isRTL = useSelector(isRTLSelector);
  const sessionName = useSelector(sessionNameSelector);
  const locale = useSelector(localeSelector);
  const [name, setName] = React.useState(sessionName);
  const history = useSelector(historySelector);

  const setLocale = React.useCallback(
    (newLocale: string) => {
      dispatch(globalActions.setLocale(newLocale));
    },
    [dispatch],
  );

  const startChallenge = React.useCallback(
    (locale: string, name: string) => () => {
      dispatch(questionsActions.start(locale, name));
    },
    [dispatch],
  );

  return (
    <Container>
      <Input onChange={onChangeValue(setName)} placeholder={capitalize(translations[locale].name)} value={name} />
      <Select isRTL={isRTL} onChange={(event) => setLocale(event.currentTarget.value)} value={locale}>
        {content.map(({ language, locale }) => (
          <option key={locale} value={locale}>
            {language}
          </option>
        ))}
      </Select>
      <Button disabled={!name} onClick={startChallenge(locale, name)}>
        {capitalize(translations[locale].start)}
      </Button>
      {history.length && <HistoryChart />}
    </Container>
  );
};

export default WelcomeScreen;
