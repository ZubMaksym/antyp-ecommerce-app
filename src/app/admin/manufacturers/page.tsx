'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AdminActionButton from '@/components/admin/AdminActionButton';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Input from '@/components/ui/Input';
import { Manufacturer, ModalMode } from '@/types/commonTypes';
import { RootState, AppDispatch } from '@/state/store';
import {
    fetchManufacturers,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
} from '@/state/manufacturersSlice/manufacturersSlice';
import {
    ManufacturerValidationSchema,
    ManufacturerFormFields,
} from '@/schemas/ManufacturerValidationSchema';

const AdminManufacturersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: manufacturers, loading, submitting, error } = useSelector(
        (state: RootState) => state.manufacturers
    );

    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ManufacturerFormFields>({
        resolver: yupResolver(ManufacturerValidationSchema),
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            shortName: '',
            aboutUrl: '',
        },
    });

    const openCreateModal = () => {
        setModalMode('create');
        reset({
            name: '',
            shortName: '',
            aboutUrl: '',
        });
        setSelectedManufacturer(null);
    };

    const openEditModal = (manufacturer: Manufacturer) => {
        setModalMode('edit');
        setSelectedManufacturer(manufacturer);
        reset({
            name: manufacturer.name,
            shortName: manufacturer.shortName,
            aboutUrl: manufacturer.aboutUrl || '',
        });
    };

    const openDeleteModal = (manufacturer: Manufacturer) => {
        setModalMode('delete');
        setSelectedManufacturer(manufacturer);
    };

    const closeModal = () => {
        setModalMode(null);
        reset({
            name: '',
            shortName: '',
            aboutUrl: '',
        });
        setSelectedManufacturer(null);
    };

    const onSubmit = async (data: ManufacturerFormFields) => {
        if (!modalMode) return;

        const aboutUrlValue = (data.aboutUrl ?? '').trim();
        const payload = {
            name: data.name.trim(),
            shortName: data.shortName.trim(),
            aboutUrl: aboutUrlValue ? aboutUrlValue : null,
        };

        try {
            if (modalMode === 'create') {
                await dispatch(createManufacturer(payload)).unwrap();
            } else if (modalMode === 'edit' && selectedManufacturer) {
                await dispatch(
                    updateManufacturer({
                        id: selectedManufacturer.id,
                        ...payload,
                    })
                ).unwrap();
            }
            closeModal();
        } catch {
            // error is already stored in Redux state and displayed in the UI
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedManufacturer) return;

        try {
            await dispatch(deleteManufacturer(selectedManufacturer.id)).unwrap();
            closeModal();
        } catch {
            // error is already stored in Redux state and displayed in the UI
        }
    };

    useEffect(() => {
        dispatch(fetchManufacturers());
    }, [dispatch]);

    return (
        <section className='flex px-5 py-5 flex-col'>
            <h1 className='text-[42px] font-bold text-[#4d6d7e]'>Manufacturers</h1>

            <div className='mt-5 flex items-end'>
                <AdminActionButton action='create' onClick={openCreateModal} />
            </div>

            <div className='flex flex-col w-full border border-gray-300 rounded-md p-2 h-[550px] overflow-y-scroll scrollbar mt-5'>
                {loading ? (
                    <div className='flex justify-center items-center h-full'>
                        <LoadingSpinner message='Loading manufacturers...' />
                    </div>
                ) : error && manufacturers.length === 0 ? (
                    <div className='text-red-600 self-center justify-self-center text-[18px] font-bold'>
                        {error}
                    </div>
                ) : manufacturers.length > 0 ? (
                    manufacturers.map((manufacturer) => (
                        <div
                            key={manufacturer.id}
                            className='flex items-center justify-between hover:bg-[#E8DFD5] py-2 px-3 rounded-md'
                        >
                            <div className='flex items-center'>
                                <h2 className='text-[#4d6d7e] font-medium text-[18px]'>
                                    {manufacturer.name}
                                </h2>
                                {manufacturer.shortName !== manufacturer.name && (
                                    <span className='text-[#4d6d7e] text-[14px] ml-2 opacity-70'>
                                        ({manufacturer.shortName})
                                    </span>
                                )}
                            </div>
                            <div className='*:first:ml-0 *:ml-2'>
                                <AdminActionButton
                                    action='edit'
                                    onClick={() => openEditModal(manufacturer)}
                                />
                                <AdminActionButton
                                    action='delete'
                                    onClick={() => openDeleteModal(manufacturer)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-[#4d6d7e] self-center justify-self-center text-[18px] font-bold'>
                        No manufacturers found
                    </div>
                )}
            </div>

            {modalMode && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
                    <div className='bg-[#F6EFE7] rounded-2xl shadow-xl w-full max-w-[500px] p-6'>
                        {modalMode === 'delete' ? (
                            <>
                                <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                                    Delete Manufacturer
                                </h2>
                                <p className='text-[#4d6d7e] mb-6'>
                                    Are you sure you want to delete{' '}
                                    <span className='font-semibold'>
                                        {selectedManufacturer?.name}
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
                                    {modalMode === 'create' ? 'Create' : 'Edit'} Manufacturer
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
                                        <Input<ManufacturerFormFields>
                                            type='text'
                                            id='name'
                                            placeholder='Enter manufacturer name'
                                            register={register}
                                            errors={errors}
                                            errorMessage={errors.name?.message}
                                            className='h-[40px]'
                                        />
                                    </label>
                                    <label className='flex flex-col gap-1'>
                                        <span className='text-[16px] font-medium text-[#4d6d7e]'>
                                            Short Name *
                                        </span>
                                        <Input<ManufacturerFormFields>
                                            type='text'
                                            id='shortName'
                                            placeholder='Enter short name'
                                            register={register}
                                            errors={errors}
                                            errorMessage={errors.shortName?.message}
                                            className='h-[40px]'
                                        />
                                    </label>
                                    <label className='flex flex-col gap-1'>
                                        <span className='text-[16px] font-medium text-[#4d6d7e]'>
                                            About URL
                                        </span>
                                        <Input<ManufacturerFormFields>
                                            type='url'
                                            id='aboutUrl'
                                            placeholder='Enter about URL (optional)'
                                            register={register}
                                            errors={errors}
                                            errorMessage={errors.aboutUrl?.message}
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
    );
};

export default AdminManufacturersPage;
