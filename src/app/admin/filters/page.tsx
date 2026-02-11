'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AdminActionButton from '@/components/admin/AdminActionButton';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Input from '@/components/ui/Input';
import { FilterTypeId, FilterItem, ModalMode } from '@/types/commonTypes';
import { FILTER_TYPES } from '@/utils/data';
import { RootState, AppDispatch } from '@/state/store';
import {
    fetchFilters,
    createFilter,
    updateFilter,
    deleteFilter,
    setCurrentFilterType,
} from '@/state/adminFiltersSlice/adminFiltersSlice';
import {
    FilterValidationSchema,
    FilterFormFields,
} from '@/schemas/FilterValidationSchema';
import {ToastContainer} from 'react-toastify';
import { notify } from '@/utils/helpers';
import useForbidBodyScroll from '@/hooks/useForbidBodyScroll';

const AdminFiltersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: filters, loading, submitting, error, success } = useSelector(
        (state: RootState) => state.adminFilters
    );

    const [activeFilterType, setActiveFilterType] = useState<FilterTypeId>('beer-type');
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedFilter, setSelectedFilter] = useState<FilterItem | null>(null);

    const currentFilterConfig = FILTER_TYPES.find((type) => type.id === activeFilterType);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FilterFormFields>({
        resolver: yupResolver(FilterValidationSchema),
        mode: 'onSubmit',
        defaultValues: {
            name: '',
        },
    });

    useForbidBodyScroll(modalMode !== null, 20000);

    const openCreateModal = () => {
        setModalMode('create');
        reset({
            name: '',
        });
        setSelectedFilter(null);
    };

    const openEditModal = (item: FilterItem) => {
        setModalMode('edit');
        setSelectedFilter(item);
        reset({
            name: item.name,
        });
    };

    const openDeleteModal = (item: FilterItem) => {
        setModalMode('delete');
        setSelectedFilter(item);
    };

    const closeModal = () => {
        setModalMode(null);
        reset({
            name: '',
        });
        setSelectedFilter(null);
    };

    const onSubmit = async (data: FilterFormFields) => {
        if (!modalMode) return;

        const payload = {
            name: data.name.trim(),
        };

        try {
            if (modalMode === 'create') {
                await dispatch(
                    createFilter({
                        filterType: activeFilterType,
                        name: payload.name,
                    })
                ).unwrap();
            } else if (modalMode === 'edit' && selectedFilter) {
                await dispatch(
                    updateFilter({
                        filterType: activeFilterType,
                        id: selectedFilter.id,
                        name: payload.name,
                    })
                ).unwrap();
            }
            closeModal();
        } catch {
            // error is already stored in Redux state and displayed in the UI
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedFilter) return;

        try {
            await dispatch(
                deleteFilter({
                    filterType: activeFilterType,
                    id: selectedFilter.id,
                })
            ).unwrap();
            closeModal();
        } catch {
            // error is already stored in Redux state and displayed in the UI
        }
    };

    const handleFilterTypeChange = (filterType: FilterTypeId) => {
        setActiveFilterType(filterType);
        dispatch(setCurrentFilterType(filterType));
        closeModal();
    };

    useEffect(() => {
        dispatch(setCurrentFilterType(activeFilterType));
        dispatch(fetchFilters(activeFilterType));
    }, [dispatch, activeFilterType]);

    useEffect(() => {
        if (error) {
            notify(error, 'error');
        }
        if (success) {
            notify(success, 'success');
        }
    }, [error, success]);

    return (
        <>
            <section className='flex px-5 py-5 flex-col'>
                <h1 className='text-[42px] font-bold text-[#4d6d7e]'>Filters</h1>
                <div className='flex justify-between'>
                    <div className='mt-4 flex flex-wrap gap-3'>
                        {FILTER_TYPES.map((type) => (
                            <button
                                key={type.id}
                                type='button'
                                onClick={() => handleFilterTypeChange(type.id)}
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
                    {loading ? (
                        <div className='flex justify-center items-center h-full'>
                            <LoadingSpinner message='Loading filters...' />
                        </div>
                    ) : error && filters.length === 0 ? (
                        <div className='text-red-600 self-center justify-self-center text-[18px] font-bold'>
                            {error}
                        </div>
                    ) : filters.length > 0 ? (
                        filters.map((item: FilterItem) => (
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
                                            {selectedFilter?.name}
                                        </span>
                                        ? This action cannot be undone.
                                    </p>
                                    {error && (
                                        <div className='text-red-600 text-sm mb-4'>{error}</div>
                                    )}
                                    <div className='flex justify-end gap-3'>
                                        <Button
                                            apearence='secondary'
                                            classname='px-4 h-[36px]'
                                            onClick={closeModal}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            apearence='primary'
                                            classname='px-4 h-[36px]'
                                            onClick={handleConfirmDelete}
                                            disabled={submitting}
                                        >
                                            {submitting ? 'Deleting...' : 'Delete'}
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
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        {error && (
                                            <div className='text-red-600 text-sm'>{error}</div>
                                        )}
                                        <label className='flex flex-col gap-1'>
                                            <span className='text-[16px] font-medium text-[#4d6d7e]'>
                                                Name *
                                            </span>
                                            <Input<FilterFormFields>
                                                type='text'
                                                id='name'
                                                placeholder='Enter filter name'
                                                register={register}
                                                errors={errors}
                                                errorMessage={errors.name?.message}
                                                className='h-[40px]'
                                            />
                                        </label>
                                        <div className='flex justify-end gap-3 mt-2'>
                                            <Button
                                                apearence='secondary'
                                                classname='px-4 h-[36px]'
                                                onClick={closeModal}
                                                disabled={submitting}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                apearence='primary'
                                                classname='px-4 h-[36px]'
                                                disabled={submitting}
                                            >
                                                {submitting
                                                    ? modalMode === 'create'
                                                        ? 'Creating...'
                                                        : 'Saving...'
                                                    : modalMode === 'create'
                                                        ? 'Create'
                                                        : 'Save'}
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </section>
            <ToastContainer />
        </>
    );
};

export default AdminFiltersPage;