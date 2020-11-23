import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { getGlobalInitialState, globalActions, localeSelector } from '../store';
import content from '../questions.json';

const Container = styled.div`
  ${({ theme: { fonts } }) => css`
    border: 1px solid black;
    display: flex;
    flex-flow: column nowrap;
    font-family: ${fonts.code};

    & * {
      font-family: ${fonts.code};
    }
  `}
`;

const LocalePicker: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector(localeSelector);

  const onLocaleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(globalActions.setLocale(event.currentTarget.value));
    },
    [dispatch],
  );

  return (
    <Container>
      <div>Default locale: {getGlobalInitialState().locale}</div>
      <div>Current locale: {locale}</div>
      <div>
        Action:
        <select onChange={onLocaleChange} value={locale}>
          {content.map(({ language, locale }) => (
            <option key={locale} value={locale}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
};

export default LocalePicker;
