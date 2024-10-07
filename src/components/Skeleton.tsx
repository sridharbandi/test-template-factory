import React from 'react';
import { useThemedStyles } from '../hooks/useThemedStyles';

interface SkeletonProps {
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = '20px', className = '' }) => {
  const { getThemedClass } = useThemedStyles();
  const randomWidth = Math.floor(Math.random() * (66 - 33 + 1) + 33);

  return (
    <div
      className={`animate-pulse ${getThemedClass('bg-gray-700', 'bg-gray-300')} ${className}`}
      style={{ width: `${randomWidth}%`, height }}
    ></div>
  );
};

export default Skeleton;
