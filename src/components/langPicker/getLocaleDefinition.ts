import locales from '../../../content/locales.json';

export default function getLocaleDefinition(locale: string) {
  if (Object.keys(locales).includes(locale)) {
    return locales[locale as keyof typeof locales];
  }

  return locales['en-EN'];
}
