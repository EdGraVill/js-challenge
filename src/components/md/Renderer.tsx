import type { FC } from 'react';
import type { remark } from 'remark';

import Node from './Node';

interface Props {
  className?: string;
  nodes: ReturnType<typeof remark.parse>['children'];
}

const Renderer: FC<Props> = ({ className, nodes }) => {
  return (
    <>
      {nodes.map((node) => (
        <Node className={className} key={JSON.stringify(node.position)} node={node} />
      ))}
    </>
  );
};

export default Renderer;
