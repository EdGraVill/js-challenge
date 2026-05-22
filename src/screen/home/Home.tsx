import type { Language } from '@/globalTypes';
import type { FC } from 'react';

interface Props {
  mainLanguage: Language;
}

const Home: FC<Props> = ({}) => (
  <main>
    <h1>JS Challenge</h1>
    <button>Iniciar</button>
  </main>
);

export default Home;
