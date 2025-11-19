import { CategoryCardProps } from '@/types/componentTypes';


const CategoryCard = ({ children, subtitle }: CategoryCardProps) => {

    return (
        <button className=''>
            <div
                className={`sm:w-[200px] sm:h-[170px] w-[130px] h-[110px] rounded-xl cursor-pointer border overflow-hidden outline-offset-2 hover:outline-[#cddde4] hover:outline-3 hover:ring-2 hover:ring-[#4d6d7e]`}
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
