import content from './questions.json';

interface Translations {
  congratulations: string;
  day: string;
  days: string;
  explanation: string;
  name: string;
  new: string;
  next: string;
  previous: string;
  previosresults: string;
  results: string;
  start: string;
  welcome: string;
  youreawesome: string;
}

const translations: { [locale: string]: Translations } = {
  'ar-EG': {
    congratulations: 'تهانينا',
    day: 'يوم',
    days: 'أيام',
    explanation: 'تفسير',
    name: 'اسم',
    new: 'جديد',
    next: 'التالى',
    previous: 'السابق',
    previosresults: 'النتائج السابقة',
    results: 'النتائج',
    start: 'بداية',
    welcome: 'أهلا بك',
    youreawesome: 'انت رائع',
  },
  'bs-BS': {
    congratulations: 'čestitke',
    day: 'dan',
    days: 'dani',
    explanation: 'objašnjenje',
    name: 'ime',
    new: 'novo',
    next: 'sljedeći',
    previous: 'prethodna',
    previosresults: 'prethodnih rezultata',
    results: 'rezultati',
    start: 'start',
    welcome: 'dobrodošli',
    youreawesome: 'ti si neverovatan',
  },
  'de-DE': {
    congratulations: 'herzliche glückwünsche',
    day: 'tag',
    days: 'tage',
    explanation: 'erläuterung',
    name: 'name',
    new: 'neu',
    next: 'nächster',
    previous: 'bisherige',
    previosresults: 'vorherige ergebnisse',
    results: 'ergebnisse',
    start: 'start',
    welcome: 'herzlich willkommen',
    youreawesome: 'du bist unglaublich',
  },
  'en-EN': {
    congratulations: 'congratulations',
    day: 'day',
    days: 'days',
    explanation: 'explanation',
    name: 'name',
    new: 'new',
    next: 'next',
    previous: 'previous',
    previosresults: 'previous results',
    results: 'results',
    start: 'start',
    welcome: 'welcome',
    youreawesome: 'you are incredible',
  },
  'es-ES': {
    congratulations: 'felicidades',
    day: 'día',
    days: 'dias',
    explanation: 'explicación',
    name: 'nombre',
    new: 'nuevo',
    next: 'siguiente',
    previous: 'anterior',
    previosresults: 'resultados anteriores',
    results: 'resultados',
    start: 'comenzar',
    welcome: 'bienvenido',
    youreawesome: 'eres increíble',
  },
  'fr-FR': {
    congratulations: 'toutes nos félicitations',
    day: 'journée',
    days: 'journées',
    explanation: 'explication',
    name: 'nom',
    new: 'nouveau',
    next: 'prochain',
    previous: 'précédent',
    previosresults: 'résultats précédents',
    results: 'résultats',
    start: 'début',
    welcome: 'bienvenue',
    youreawesome: 'vous êtes incroyable',
  },
  'id-ID': {
    congratulations: 'selamat',
    day: 'hari',
    days: 'hari-hari',
    explanation: 'penjelasan',
    name: 'nama',
    new: 'baru',
    next: 'lanjut',
    previous: 'sebelumnya',
    previosresults: 'hasil sebelumnya',
    results: 'hasil',
    start: 'mulailah',
    welcome: 'selamat datang',
    youreawesome: 'kamu luar biasa',
  },
  'ja-JA': {
    congratulations: 'おめでとう',
    day: '日',
    days: '日々',
    explanation: '説明',
    name: '名前',
    new: '新着',
    next: '次',
    previous: '前',
    previosresults: '以前の結果',
    results: '結果',
    start: '開始',
    welcome: 'ようこそ',
    youreawesome: 'あなたは素晴らしい',
  },
  'ko-KR': {
    congratulations: '축하합니다',
    day: '일',
    days: '일',
    explanation: '설명',
    name: '이름',
    new: '새로운',
    next: '다음',
    previous: '이전',
    previosresults: '이전 결과',
    results: '결과',
    start: '스타트',
    welcome: '어서 오십시오',
    youreawesome: '당신은 믿을 수 있습니다',
  },
  'nl-NL': {
    congratulations: 'gefeliciteerd',
    day: 'dag',
    days: 'dagen',
    explanation: 'uitleg',
    name: 'naam',
    new: 'nieuw',
    next: 'de volgende',
    previous: 'voorgaand',
    previosresults: 'eerdere resultaten',
    results: 'uitslagen',
    start: 'begin',
    welcome: 'welkom',
    youreawesome: 'je bent geweldig',
  },
  'pt-BR': {
    congratulations: 'parabéns',
    day: 'dia',
    days: 'dias',
    explanation: 'explicação',
    name: 'nome',
    new: 'novo',
    next: 'próximo',
    previous: 'anterior',
    previosresults: 'resultados anteriores',
    results: 'resultados',
    start: 'começar',
    welcome: 'bem-vinda',
    youreawesome: 'você é incrível',
  },
  'ru-RU': {
    congratulations: 'поздравляю',
    day: 'день',
    days: 'дней',
    explanation: 'объяснение',
    name: 'название',
    new: 'новый',
    next: 'следующий',
    previous: 'предыдущий',
    previosresults: 'предыдущие результаты',
    results: 'полученные результаты',
    start: 'начало',
    welcome: 'добро пожаловать',
    youreawesome: 'ты потрясающая',
  },
  'th-TH': {
    congratulations: 'ขอแสดงความยินดี',
    day: 'วัน',
    days: 'วัน',
    explanation: 'คำอธิบาย',
    name: 'ชื่อ',
    new: 'ใหม่',
    next: 'ต่อไป',
    previous: 'ก่อน',
    previosresults: 'ผลการค้นหาก่อน',
    results: 'ผล',
    start: 'เริ่มต้น',
    welcome: 'ยินดีต้อนรับ',
    youreawesome: 'คุณเป็นที่น่าทึ่ง',
  },
  'tr-TR': {
    congratulations: 'tebrikler',
    day: 'gün',
    days: 'günler',
    explanation: 'açıklama',
    name: 'isim',
    new: 'yeni',
    next: 'sonraki',
    previous: 'önceki',
    previosresults: 'önceki sonuçlar',
    results: 'sonuçlar',
    start: 'başlat',
    welcome: 'hoşgeldiniz',
    youreawesome: 'eğer inanılmaz',
  },
  'ua-UA': {
    congratulations: 'вітаю',
    day: 'день',
    days: 'днів',
    explanation: 'пояснення',
    name: "ім'я",
    new: 'новий',
    next: 'наступного',
    previous: 'попередній',
    previosresults: 'попередні результати',
    results: 'результати',
    start: 'початок',
    welcome: 'ласкаво просимо',
    youreawesome: 'ти неймовірний',
  },
  'vi-VI': {
    congratulations: 'xin chúc mừng',
    day: 'ngày',
    days: 'ngày',
    explanation: 'giải trình',
    name: 'tên',
    new: 'mới',
    next: 'kế tiếp',
    previous: 'trước',
    previosresults: 'kết quả trước đó',
    results: 'các kết quả',
    start: 'khởi đầu',
    welcome: 'hoan nghênh',
    youreawesome: 'bạn thật phi thường',
  },
  'zh-CN': {
    congratulations: '祝贺',
    day: '天',
    days: '天',
    explanation: '说明',
    name: '名称',
    new: '新',
    next: '下一个',
    previous: '以前',
    previosresults: '以前的结果',
    results: '结果',
    start: '开始',
    welcome: '欢迎',
    youreawesome: '你太不可思议了',
  },
  'zh-TW': {
    congratulations: '祝賀',
    day: '天',
    days: '天',
    explanation: '說明',
    name: '名稱',
    new: '新',
    next: '下一個',
    previous: '以前',
    previosresults: '以前的結果',
    results: '結果',
    start: '開始',
    welcome: '歡迎',
    youreawesome: '你太不可思議了',
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
