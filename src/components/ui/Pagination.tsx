import { PaginationProps } from '@/types/componentTypes';
import classNames from 'classnames';

const Pagination = ({ totalPages, setCurrentPage, currentPage }: PaginationProps) => {
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
                            //hover:text-white hover:bg-[#4d6d7e]
                            className={classNames(
                                'cursor-pointer flex items-center justify-center border hover:border-[#737373] border-[#4d6d7e] rounded hover:text-[#737373] hover:border-[#737373] text-[#4d6d7e] w-[30px] h-[30px]',
                                {
                                    'text-white bg-[#4d6d7e]': currentPage === page
                                }
                            )}
                            onClick={() => setCurrentPage(page)}
                        >
                            <span className='text-[22px] font-bold mb-1'>
                                {page}
                            </span>
                        </button>
                    </a>
                ))
            }
        </div>
    );
};

export default Pagination;
