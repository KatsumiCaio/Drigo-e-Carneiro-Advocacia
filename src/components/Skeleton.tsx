import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'h-4 rounded-xs w-full';
      case 'card':
        return 'rounded-sm gold-border-subtle';
      case 'rectangular':
      default:
        return 'rounded-xs';
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-[#1F1410]/80 ${getVariantStyles()} ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.08) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export const BentoGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
    <div className="md:col-span-2 md:row-span-2 p-8 tobacco-bg gold-border flex flex-col justify-between min-h-[380px]">
      <div className="space-y-4">
        <Skeleton className="w-12 h-12 rotate-45" />
        <Skeleton className="w-3/4 h-8 mt-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
      </div>
      <div className="pt-8 flex gap-4">
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-40 h-10" />
      </div>
    </div>
    <div className="p-6 tobacco-bg gold-border space-y-4 min-h-[180px]">
      <Skeleton className="w-10 h-10" />
      <Skeleton className="w-2/3 h-6" />
      <Skeleton className="w-full h-3" />
    </div>
    <div className="p-6 tobacco-bg gold-border space-y-4 min-h-[180px]">
      <Skeleton className="w-10 h-10" />
      <Skeleton className="w-2/3 h-6" />
      <Skeleton className="w-full h-3" />
    </div>
  </div>
);

export const TriageSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto p-8 tobacco-bg gold-border space-y-8">
    <div className="space-y-3 text-center">
      <Skeleton className="w-48 h-4 mx-auto" />
      <Skeleton className="w-72 h-8 mx-auto" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
    </div>
    <div className="flex justify-between pt-6 border-t border-[#D4AF37]/20">
      <Skeleton className="w-28 h-10" />
      <Skeleton className="w-36 h-10" />
    </div>
  </div>
);

export const SectionSkeleton: React.FC<{ title?: string; height?: string }> = ({
  height = 'h-96',
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className={`w-full ${height} tobacco-bg gold-border-subtle p-8 space-y-6 flex flex-col justify-center`}>
      <Skeleton className="w-40 h-5" />
      <Skeleton className="w-3/4 max-w-md h-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  </div>
);
