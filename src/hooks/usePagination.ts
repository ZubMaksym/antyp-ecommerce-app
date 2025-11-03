import { IusePagination } from '@/types/hookTypes';
import { useState } from 'react';
import { useMemo } from 'react';

const usePagination = ({ totalCount, productPerPage }: IusePagination) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalCount] = useState(totalCount);
    const totalPages = useMemo(() => Math.ceil(totalPageCount / productPerPage), [totalPageCount, productPerPage]);

    return {
        currentPage,
        totalPages,
        setCurrentPage,
        setTotalCount,
        productPerPage
    };
};

export default usePagination;