import type { FC } from 'react';
import { useCallback } from 'react';

import Md from '../md';

interface Props {
  onOptionSelected(optionIx: number): void;
  options: string[];
  selectedOption?: number;
}

const Options: FC<Props> = ({ onOptionSelected, options, selectedOption }) => {
  const onClick = useCallback(
    (optionIx: number) => () => {
      if (!selectedOption) {
        onOptionSelected(optionIx);
      }
    },
    [onOptionSelected, selectedOption],
  );

  return (
    <div className="grid max-w-sm grid-cols-1 gap-y-4 text-neutral-300">
      {options.map((option, ix) => (
        <button
          className={`group flex min-h-[2.5rem] w-full items-center rounded-md border border-slate-600 pr-4 hover:border-slate-500`}
          disabled={!!selectedOption}
          key={option}
          onClick={onClick(ix)}
        >
          <span className="mr-4 flex h-full items-center rounded-bl-sm rounded-tl-sm border-r border-slate-600 bg-slate-600 px-3 font-bold group-hover:border-slate-500 group-hover:bg-slate-500">
            {String.fromCharCode(65 + ix)}
          </span>
          <Md className="inline py-2">{option}</Md>
        </button>
      ))}
    </div>
  );
};

export default Options;
