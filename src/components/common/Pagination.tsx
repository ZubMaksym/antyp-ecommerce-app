import { PaginationProps } from '@/types/componentTypes';
import classNames from 'classnames';
import Image from 'next/image';
import caret from '@/public/icons/shared/caretDropdownBold.svg';
import { scrollTo } from '@/utils/helpers';

const Pagination = ({ totalPages, setCurrentPage, currentPage, scrollTopValue }: PaginationProps) => {
    const maxVisiblePages = 3; // кількість сторінок у пагінації
    const pages: Array<number | string> = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Формуємо масив сторінок
    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
    }

    const setPrevPage = () => {
        scrollTo(scrollTopValue);
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const setNextPage = () => {
        scrollTo(scrollTopValue);
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const setPage = (page: number) => {
        scrollTo(scrollTopValue);
        setCurrentPage(page);
    };

    return (
        <div className='mt-[40px] flex items-center'>
            <button className='rotate-90 cursor-pointer mt-2' onClick={setPrevPage}>
                <Image src={caret} width={40} height={40} alt='previous page' />
            </button>
            <div className='flex *:first:ml-0 *:ml-[10px] mt-2 sm:*:ml-3'>
                {pages.map((page, ind) => (
                    page === '...' ? (
                        <span key={ind} className='flex items-center justify-center w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] text-[#4d6d7e]'>
                            ...
                        </span>
                    ) : (
                        <button
                            key={ind}
                            className={classNames(
                                'cursor-pointer flex items-center justify-center border hover:border-[#737373] border-[#4d6d7e] rounded-[50%] hover:text-[#737373] hover:border-[#737373] text-[#4d6d7e] w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]',
                                {
                                    'text-white bg-[#4d6d7e]': currentPage === page
                                }
                            )}
                            onClick={() => setPage(page as number)}
                        >
                            <span className='text-[16px] sm:text-[22px] font-bold mb-1'>{page}</span>
                        </button>
                    )
                ))}
            </div>
            <button className='rotate-270 cursor-pointer mt-2' onClick={setNextPage}>
                <Image src={caret} width={40} height={40} alt='next page' />
            </button>
        </div>
    );
};

export default Pagination;
