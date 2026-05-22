import type { FC } from 'react';
import { useMemo } from 'react';
import { remark } from 'remark';

import Renderer from './Renderer';

interface props {
  children: string;
  className?: string;
}

const Md: FC<props> = ({ children, className }) => {
  const root = useMemo(() => remark.parse(children), [children]);

  return <Renderer className={className} nodes={root.children} />;
};

export default Md;
