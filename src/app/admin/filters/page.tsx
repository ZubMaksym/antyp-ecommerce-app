'use client';
import { useState } from 'react';
import AdminActionButton from '@/components/admin/AdminActionButton';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FilterTypeId, FilterItem, ModalMode } from '@/types/commonTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const FILTER_TYPES: { id: FilterTypeId; label: string }[] = [
    { id: 'beer-type', label: 'Beer Types' },
    { id: 'season-tag', label: 'Season Tags' },
    { id: 'carbonation-level', label: 'Carbonation Levels' },
    { id: 'water-type', label: 'Water Types' },
    { id: 'soft-drink-type', label: 'Soft Drink Types' },
    { id: 'wine-color', label: 'Wine Colors' },
    { id: 'wine-sweetness', label: 'Wine Sweetness' },
    { id: 'ingredient', label: 'Ingredients' },
];

const AdminFiltersPage = () => {
    const [activeFilterType, setActiveFilterType] = useState<FilterTypeId>('beer-type');

    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedFilter, setSelectedFilter] = useState<Array<FilterItem>>([]);
    const [modalNameValue, setModalNameValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const currentFilterConfig = FILTER_TYPES.find((type) => type.id === activeFilterType);

    const openCreateModal = () => {
        setModalMode('create');
        setModalNameValue('');
    };

    const openEditModal = (item: FilterItem) => {
        setModalMode('edit');
        setSelectedFilter([item]);
        setModalNameValue(item.name);
    };

    const openDeleteModal = (item: FilterItem) => {
        setModalMode('delete');
        setSelectedFilter([item]);
        setModalNameValue(item.name);
    };

    const closeModal = () => {
        setModalMode(null);
        setModalNameValue('');
    };

    // Handlers below are UI-only; actual CRUD logic will be implemented later
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        closeModal();
    };

    const handleConfirmDelete = () => {
        closeModal();
    };

    useEffect(() => {
        const fetchFilters = async () => {
            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/attributes/${activeFilterType}`);

            if (!response.ok) {
                throw new Error(`API Error ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setSelectedFilter(data.result);
            setIsLoading(false);
        };

        fetchFilters();
    }, [activeFilterType]);

    return (
        <section className='flex px-5 py-5 flex-col'>
            <h1 className='text-[42px] font-bold text-[#4d6d7e]'>Filters</h1>

            {/* Filter type selector */}
            <div className='flex justify-between'>
                <div className='mt-4 flex flex-wrap gap-3'>
                    {FILTER_TYPES.map((type) => (
                        <button
                            key={type.id}
                            type='button'
                            onClick={() => setActiveFilterType(type.id)}
                            className={`cursor-pointer px-4 py-2 rounded-full text-[16px] font-medium border transition-colors duration-200 ${activeFilterType === type.id
                                ? 'bg-[#4d6d7e] text-white border-[#4d6d7e]'
                                : 'bg-transparent text-[#4d6d7e] border-[#4d6d7e] hover:bg-[#d7cdc3]'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
                <div className='mt-5 flex items-end'>
                    <AdminActionButton action='create' onClick={openCreateModal} />
                </div>
            </div>

            {/* Filters list */}
            <div className='flex flex-col w-full border border-gray-300 rounded-md p-2 h-[550px] overflow-y-scroll scrollbar mt-5'>
                {isLoading ? (
                    <div className='flex justify-center items-center h-full'>
                        <LoadingSpinner message='Loading filters...' />
                    </div>
                ) : selectedFilter && selectedFilter.length > 0 ? (
                    selectedFilter?.map((item: FilterItem) => (
                        <div
                            key={item.id}
                            className='flex items-center justify-between hover:bg-[#E8DFD5] py-2 px-3 rounded-md'
                        >
                            <div className='flex items-center'>
                                <h2 className='text-[#4d6d7e] font-medium text-[18px]'>
                                    {item.name}
                                </h2>
                            </div>
                            <div className='*:first:ml-0 *:ml-2'>
                                <AdminActionButton
                                    action='edit'
                                    onClick={() => openEditModal(item)}
                                />
                                <AdminActionButton
                                    action='delete'
                                    onClick={() => openDeleteModal(item)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-[#4d6d7e] self-center justify-self-center text-[18px] font-bold'>
                        No {currentFilterConfig?.label.toLowerCase()} found
                    </div>
                )}
            </div>

            {/* Modal overlays – UI only */}
            {modalMode && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
                    <div className='bg-[#F6EFE7] rounded-2xl shadow-xl w-full max-w-[500px] p-6'>
                        {modalMode === 'delete' ? (
                            <>
                                <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                                    Delete {currentFilterConfig?.label.slice(0, -1)}
                                </h2>
                                <p className='text-[#4d6d7e] mb-6'>
                                    Are you sure you want to delete{' '}
                                    <span className='font-semibold'>
                                        {selectedFilter?.map((item: FilterItem) => item.name).join(', ')}
                                    </span>
                                    ? This action cannot be undone.
                                </p>
                                <div className='flex justify-end gap-3'>
                                    <Button
                                        apearence='secondary'
                                        classname='px-4 h-[36px]'
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        apearence='primary'
                                        classname='px-4 h-[36px]'
                                        onClick={handleConfirmDelete}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                                    {modalMode === 'create' ? 'Create' : 'Edit'}{' '}
                                    {currentFilterConfig?.label.slice(0, -1)}
                                </h2>
                                <form
                                    className='flex flex-col gap-4'
                                    onSubmit={handleSubmit}
                                >
                                    <label className='flex flex-col gap-1'>
                                        <span className='text-[16px] font-medium text-[#4d6d7e]'>
                                            Name
                                        </span>
                                        <input
                                            type='text'
                                            value={modalNameValue}
                                            onChange={(e) =>
                                                setModalNameValue(e.target.value)
                                            }
                                            className='h-[40px] rounded-lg border border-[#4d6d7e] px-3 text-[#4d6d7e] bg-white focus:outline-none focus:ring-2 focus:ring-[#4d6d7e]'
                                            placeholder='Enter name'
                                        />
                                    </label>
                                    <div className='flex justify-end gap-3 mt-2'>
                                        <Button
                                            apearence='secondary'
                                            classname='px-4 h-[36px]'
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            apearence='primary'
                                            classname='px-4 h-[36px]'
                                            disabled={!modalNameValue.trim()}
                                        >
                                            {modalMode === 'create' ? 'Create' : 'Save'}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default AdminFiltersPage;