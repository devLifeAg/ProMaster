// components/SkeletonBox.tsx
export default function SkeletonBox({ className = '', height = 'h-4', width = 'w-full', rounded = '' }) {
  return (
    <div className={`bg-gray-200 animate-pulse ${height} ${width} ${rounded} ${className}`}></div>
  );
}
