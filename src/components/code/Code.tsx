'use client';

import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import type { FC } from 'react';
import { useEffect, useMemo, useRef } from 'react';

import './prism-one-dark.css';

interface Props {
  code: string;
  language: string;
}

const Code: FC<Props> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  const grammar = useMemo(() => Prism.languages[language], [language]);
  const html = useMemo(() => Prism.highlight(code, grammar, language), [code, grammar, language]);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = html;

      Prism.hooks.run('complete', {
        code,
        element: codeRef.current,
        grammar,
      });
    }
  }, [html]);

  return (
    <div className="line-numbers w-full select-none font-['Cascadia_Code']">
      <pre className={`language-${language} line-numbers rounded-xl`}>
        <code className={`language-${language} line-numbers`} ref={codeRef} />
      </pre>
    </div>
  );
};

export default Code;
