import React from 'react';

interface TagListProps {
  tags?: string[];
  size?: 'sm' | 'md';
  className?: string;
}

const TagList: React.FC<TagListProps> = ({ tags, size = 'sm', className }) => {
  if (!tags || tags.length === 0) return null;

  const baseStyle = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-2 py-1 text-sm';

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {tags.map((tag, i) => (
        <span
          key={i}
          className={`${baseStyle} bg-cyan-700/30 text-cyan-300 rounded-lg`}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
