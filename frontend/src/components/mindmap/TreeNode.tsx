"use client";

import styles from "@/app/mindmap/mindmap.module.scss";

export type MindMapNode = {
  title: string;
  children?: MindMapNode[];
};

type Props = {
  node: MindMapNode;
};

export default function TreeNode({ node }: Props) {
  return (
    <li className={styles.nodeItem}>
      <div className={styles.nodeBox}>{node.title}</div>

      {node.children && node.children.length > 0 && (
        <ul className={styles.childrenList}>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}