import * as React from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components';
import translationsInfo from '../translationsInfo';
import { SettingsContext } from '../util';

const Container = styled.div`
  ${({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.background};
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding: .5rem;
    width: 100%;
  `}
`;

const SelectContainer = styled.div`
  width: 10rem;
`;

const Label = styled.div`
  ${({ theme: { fonts } }: { theme: Theme }) => css`
    align-items: center;
    display: flex;
    font-family: ${fonts.titles};
    flex-flow: row nowrap;
  `}
`;

const Image = styled.img`
  height: 1.5rem;
  padding-right: .5rem;
`;

const loadFlagsImg = async (locales: string[]): Promise<string[]> => {
  const srcs = await Promise.all(locales.map(async (locale): Promise<string> => {
    try {
      const { default: img } = await import(`../UI/flags/${locale}.svg`);

      return img;
    } catch (error) {
      const { default: img } = await import('../UI/flags/no-flag.svg');

      return img;
    }
  }));

  return srcs;
}

const LanguageSelector = () => {
  const { language, setSetting } = React.useContext(SettingsContext);
  const [flagsImg, setFlagsImg] = React.useState<string[]>([]);

  React.useEffect(() => {
    const availableFlags = translationsInfo.map(({ locale }) => locale);
    if (availableFlags.length !== flagsImg.length) {
      loadFlagsImg(availableFlags).then((srcs) => {
        setFlagsImg(srcs);
      });
    }
  }, [flagsImg]);

  if (!flagsImg.length) {
    return <div>Loading...</div>;
  }

  const options = translationsInfo.map(({ name, locale }, ix) => ({
    label: <Label><Image src={flagsImg[ix]} /> {name}</Label>,
    value: locale
  }));
  const selected = options.find(({ value }) => value === language);
  const onChange = (value: any) => setSetting({ setting: 'language', value: value.value });

  return (
    <Container>
      <SelectContainer>
        <Select defaultValue={selected} name="language" options={options} onChange={onChange} menuPlacement="auto" />
      </SelectContainer>
    </Container>
  );
};

export default LanguageSelector;
