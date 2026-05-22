import cn from 'classnames';
import type { FC } from 'react';
import type { remark } from 'remark';

import Code from '../code';
import Renderer from './Renderer';

type NodeType = ReturnType<typeof remark.parse>['children'][number];

interface Props {
  className?: string;
  node: NodeType;
}

const baseStyles = 'text-neutral-300';

const Node: FC<Props> = ({ className, node }) => {
  if (node.type === 'html') {
    return <div className={cn(baseStyles, className)} dangerouslySetInnerHTML={{ __html: node.value }} />;
  }

  if (node.type === 'blockquote') {
    return (
      <blockquote className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </blockquote>
    );
  }

  if (node.type === 'break') {
    return <br className={cn(baseStyles, className)} />;
  }

  if (node.type === 'code') {
    return <Code code={node.value} language={node.lang ?? 'text'} />;
  }

  if (node.type === 'delete') {
    return (
      <del className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </del>
    );
  }

  if (node.type === 'emphasis') {
    return (
      <em className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </em>
    );
  }

  if (node.type === 'heading') {
    if (node.depth === 2) {
      return (
        <h2 className={cn(baseStyles, className)}>
          <Renderer nodes={node.children} />
        </h2>
      );
    }

    if (node.depth === 3) {
      return (
        <h3 className={cn(baseStyles, className)}>
          <Renderer nodes={node.children} />
        </h3>
      );
    }

    if (node.depth === 4) {
      return (
        <h4 className={cn(baseStyles, className)}>
          <Renderer nodes={node.children} />
        </h4>
      );
    }

    if (node.depth === 5) {
      return (
        <h5 className={cn(baseStyles, className)}>
          <Renderer nodes={node.children} />
        </h5>
      );
    }

    if (node.depth === 6) {
      return (
        <h6 className={cn(baseStyles, className)}>
          <Renderer nodes={node.children} />
        </h6>
      );
    }

    return (
      <h1 className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </h1>
    );
  }

  if (node.type === 'image') {
    return (
      <img
        alt={node.alt || undefined}
        className={cn(baseStyles, className)}
        src={node.url}
        title={node.title || undefined}
      />
    );
  }

  if (node.type === 'inlineCode') {
    return (
      <pre
        className={cn(
          baseStyles,
          className,
          "mx-0.5 inline-block rounded-md bg-[#383e49] px-2 py-1 font-['Cascadia_Code'] text-sm",
        )}
      >
        {node.value}
      </pre>
    );
  }

  if (node.type === 'link') {
    return (
      <a className={cn(baseStyles, className)} href={node.url} title={node.title || undefined}>
        <Renderer nodes={node.children} />
      </a>
    );
  }

  if (node.type === 'list') {
    if (node.ordered) {
      return (
        <ol className={cn(baseStyles, className)}>
          <Renderer nodes={node.children} />
        </ol>
      );
    }

    return (
      <ul className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </ul>
    );
  }

  if (node.type === 'listItem') {
    return (
      <li className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </li>
    );
  }

  if (node.type === 'paragraph') {
    return (
      <p className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </p>
    );
  }

  if (node.type === 'strong') {
    return (
      <strong className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </strong>
    );
  }

  if (node.type === 'table') {
    return (
      <table className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </table>
    );
  }

  if (node.type === 'tableCell') {
    return (
      <td className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </td>
    );
  }

  if (node.type === 'tableRow') {
    return (
      <tr className={cn(baseStyles, className)}>
        <Renderer nodes={node.children} />
      </tr>
    );
  }

  if (node.type === 'text') {
    return <span className={cn(baseStyles, className)}>{node.value}</span>;
  }

  if (node.type === 'thematicBreak') {
    return <hr className={cn(baseStyles, className)} />;
  }

  return (
    // @ts-ignore
    <div className={cn(baseStyles, className)}>{node.children ? <Renderer nodes={node.children} /> : node.value}</div>
  );
};

export default Node;
