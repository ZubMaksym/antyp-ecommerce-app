import { FilterSkeletonProps } from '@/types/componentTypes';

export const FilterSkeleton = ({record}: FilterSkeletonProps) => {
  return (
    <>
        {
            Array(record || 0).fill(0).map((_, idx) => (
                <div key={idx} className='animate-pulse flex items-center gap-2 w-[60%]'>
                    <div className='w-[20px] h-[20px] bg-gray-300 rounded'></div>
                    <div className='h-4 bg-gray-300 rounded flex-1'></div>
                </div>
            ))
        }
    </>
  );
};
