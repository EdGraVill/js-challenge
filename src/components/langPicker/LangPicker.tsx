'use client';

import { Language } from '@/globalTypes';
import cn from 'classnames';
import { useCallback, useMemo, useRef } from 'react';

import getLocaleDefinition from './getLocaleDefinition';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  availableLanguages?: Array<keyof typeof Language>;
  lang: keyof typeof Language;
  onLangChange(lang: keyof typeof Language): void;
}

const LangPicker: React.FC<Props> = ({ availableLanguages, onLangChange, lang, className, ...divProps }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(
    (lang: keyof typeof Language) => () => {
      onLangChange(lang);
    },
    [onLangChange],
  );

  const onSwitch = useCallback(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.show();
      selectedRef.current?.focus();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const {
    flag: currentFlag,
    language: currentLanguage,
    isRTL: currentIsRTL,
  } = useMemo(() => getLocaleDefinition(lang), [lang]);

  return (
    <div className={cn('w-36', className)} {...divProps}>
      <label className="flex w-full flex-col items-start" dir={currentIsRTL ? 'rtl' : 'ltr'}>
        <span className="mb-1 w-full text-xs text-neutral-300">Language</span>
        <button
          className="relative m-0 w-full rounded-lg bg-slate-600 px-3 py-1 text-start text-neutral-300"
          dir={currentIsRTL ? 'rtl' : 'ltr'}
          onClick={onSwitch}
        >
          {currentFlag} {currentLanguage}
          <dialog className="left-0 m-0 mt-3 h-60 min-w-max overflow-auto bg-transparent p-0" ref={dialogRef}>
            <div className="flex flex-col items-start overflow-hidden rounded-md bg-slate-700 text-neutral-300">
              {Object.keys(Language)
                .filter((lang) => {
                  if (!availableLanguages) return true;

                  return availableLanguages.includes(lang as keyof typeof Language);
                })
                .map((lang) => {
                  const { flag, language, isRTL } = getLocaleDefinition(lang);

                  return (
                    <button
                      className={cn('w-full py-1 pl-3 pr-4 text-start hover:bg-slate-600', {
                        'bg-slate-600': currentLanguage === language,
                      })}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      key={lang}
                      onClick={onClick(lang as keyof typeof Language)}
                      ref={currentLanguage === language ? selectedRef : undefined}
                    >
                      {flag} {language}
                    </button>
                  );
                })}
            </div>
          </dialog>
        </button>
      </label>
    </div>
  );
};

export default LangPicker;
