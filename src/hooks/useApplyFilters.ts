import { useState } from "react"

const useApplyFilters = () => {
    const [isOpen, setIsOpen] = useState(false);
    return {isOpen, setIsOpen};
};

export default useApplyFilters;