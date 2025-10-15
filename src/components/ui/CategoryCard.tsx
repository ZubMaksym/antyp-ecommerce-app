import { CategoryCardProps } from '@/types/componentTypes';


const CategoryCard = ({ children, subtitle }: CategoryCardProps) => {

    return (
        <button className=''>
            <div
                className={`2xl:w-[200px] 2xl:h-[170px] xl:w-[175px] xl:h-[150px] lg:w-[150px] lg:h-[130px] 
            md:w-[175px] md:h-[150px] w-[140px] h-[120px] rounded-xl cursor-pointer border overflow-hidden outline-offset-2 hover:outline-[#cddde4] hover:outline-3 hover:ring-2 hover:ring-[#4d6d7e]`}
            >
                <div>
                    {children}
                </div>
            </div>
            <div className=''>
                <span className='text-[#4d6d7e] xl:text-[28px] lg:text-[24px] md:text-[28px] text-[22px] font-semibold'>{subtitle}</span>
            </div>
        </button>
    );
};

export default CategoryCard;
