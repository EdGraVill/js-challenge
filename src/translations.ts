import content from './questions.json';

interface Translations {
  explanation: string
}

const translations: { [locale: string]: Translations } = {
  'ar-EG': {
    explanation: 'تفسير',
  },
  'bs-BS': {
    explanation: 'objašnjenje',
  },
  'de-DE': {
    explanation: 'erläuterung',
  },
  'en-EN': {
    explanation: 'explanation',
  },
  'es-ES': {
    explanation: 'explicación',
  },
  'fr-FR': {
    explanation: 'explication',
  },
  'id-ID': {
    explanation: 'penjelasan',
  },
  'ja-JA': {
    explanation: '説明',
  },
  'ko-KR': {
    explanation: '설명',
  },
  'nl-NL': {
    explanation: 'uitleg',
  },
  'pt-BR': {
    explanation: 'explicação',
  },
  'ru-RU': {
    explanation: 'объяснение',
  },
  'th-TH': {
    explanation: 'คำอธิบาย',
  },
  'tr-TR': {
    explanation: 'açıklama',
  },
  'ua-UA': {
    explanation: 'пояснення',
  },
  'vi-VI': {
    explanation: 'giải trình',
  },
  'zh-CN': {
    explanation: '说明',
  },
  'zh-TW': {
    explanation: '說明',
  },
};

const validateTranslations = (): typeof translations => {
  const locales = content.map(({ locale }) => locale).sort();
  const availableLocales = Object.keys(translations);

  const missingLocales: string[] = [];

  locales.forEach((locale) => {
    if (!availableLocales.includes(locale)) {
      missingLocales.push(locale);
    }
  });

  if (missingLocales.length) {
    console.warn('Missing locales: ', missingLocales);
  }

  return translations;
};

export default validateTranslations();
