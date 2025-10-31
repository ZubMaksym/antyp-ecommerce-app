import { PaginationProps } from '@/types/componentTypes';

const Pagination = ({ totalPages, setCurrentPage }: PaginationProps) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className='mt-[15px] flex *:first:ml-0 *:ml-3'>
            {
                pages.map((page, ind) => (
                    <a href='#categories' key={ind}>
                        <button
                            className='cursor-pointer flex items-center justify-center border hover:border-[#737373] border-[#4d6d7e] rounded w-[30px] h-[30px]'
                            onClick={() => setCurrentPage(page)}
                        >
                            <span className='text-[22px] hover:text-[#737373] text-[#4d6d7e] font-bold mb-1'>{page}</span>
                        </button>
                    </a>
                ))
            }
        </div>
    );
};

export default Pagination;
