import cn from 'classnames';
import type { DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  containerProps?: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
  label?: string;
}

const Input: React.FC<Props> = ({ containerProps, label, className, ...inputProps }) => (
  <label {...containerProps} className={cn('flex flex-col items-start', containerProps?.className)}>
    {label && <span className="mb-1 w-full text-xs text-neutral-300">{label}</span>}
    <input
      className={cn(
        'relative m-0 w-full rounded-lg bg-slate-600 px-3 py-1 text-start text-neutral-300 selection:bg-slate-700 focus:outline-none',
        className,
      )}
      {...inputProps}
    />
  </label>
);

export default Input;
