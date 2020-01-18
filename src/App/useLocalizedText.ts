import * as React from 'react';
import { SettingsContext } from '../util';
import sample from '../i18n/en-US.json';

type Token = 'summary.title' | 'summary.body' | 'questions.loading' | 'question.previous' | 'question.next' | 'question.explanation';

export default (): ((token: Token) => string) => {
  const [locale, setLocale] = React.useState<typeof sample | null>(null);
  const { language } = React.useContext(SettingsContext);

  React.useEffect(() => {
    import(`../i18n/${language}.json`).then(({ default: loadedLocale }) => {
      setLocale(loadedLocale);
    });
  }, [language]);

  return (token: Token) => {
    if (!locale) {
      return '';
    }

    // eslint-disable-next-line no-eval
    return eval(`locale.${token}`) as string;
  }
};
