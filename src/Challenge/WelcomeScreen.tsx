import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionsActions, sessionNameSelector } from '../QuestionsEngine';
import { globalActions, localeSelector } from '../store';
import content from '../questions.json';
import styled, { css } from 'styled-components';
import translations from '../translations';
import { capitalize } from '../util';

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
    border-bottom: 3px solid white;
    color: ${colors.text};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;

    &:focus {
      outline: none;
    }
  `}
`;

const Select = styled.select`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.inlineCodeBackground};
    border: 0;
    border-radius: .3rem;
    color: ${colors.inlineCodeColor};
    cursor: pointer;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    padding: .5rem 1rem;

    &:focus {
      outline: none;
    }
  `}
`;

const onChangeValue = (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => setter(event.currentTarget.value);

const WelcomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const sessionName = useSelector(sessionNameSelector);
  const locale = useSelector(localeSelector);
  const [name, setName] = React.useState(sessionName);

  const setLocale = React.useCallback((newLocale: string) => {
    dispatch(globalActions.setLocale(newLocale));
  }, [dispatch]);

  const startChallenge = React.useCallback((locale: string, name: string) => () => {
    dispatch(questionsActions.start(locale, name));
  }, [dispatch]);

  return (
    <Container>
      <Input onChange={onChangeValue(setName)} placeholder={capitalize(translations[locale].name)} value={name} />
      <Select onChange={(event) => setLocale(event.currentTarget.value)} value={locale}>
        {content.map(({ language, locale }) => (
          <option key={locale} value={locale}>{language}</option>
        ))}
      </Select>
      <button disabled={!name} onClick={startChallenge(locale, name)}>
        {capitalize(translations[locale].start)}
      </button>
    </Container>
  );
};

export default WelcomeScreen;
