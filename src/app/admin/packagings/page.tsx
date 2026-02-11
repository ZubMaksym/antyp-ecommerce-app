'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AdminActionButton from '@/components/admin/AdminActionButton';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Input from '@/components/ui/Input';
import { Packaging, ModalMode } from '@/types/commonTypes';
import { RootState, AppDispatch } from '@/state/store';
import {
    fetchPackagings,
    createPackaging,
    updatePackaging,
    deletePackaging,
} from '@/state/packagingsSlice/packagingsSlice';
import {
    PackagingsValidationSchema,
    PackagingsFormFields,
} from '@/schemas/PackagingsValidationSchema';
import {ToastContainer} from 'react-toastify';
import { notify } from '@/utils/helpers';
import useForbidBodyScroll from '@/hooks/useForbidBodyScroll';


const AdminPackagingsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: packagings, loading, submitting, error, success } = useSelector(
        (state: RootState) => state.packagings
    );

    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedPackaging, setSelectedPackaging] = useState<Packaging | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PackagingsFormFields>({
        resolver: yupResolver(PackagingsValidationSchema) as any,
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            // shortName: undefined,
            shortName: '',
        },
    });

    useForbidBodyScroll(modalMode !== null, 20000);

    const openCreateModal = () => {
        setModalMode('create');
        reset({
            name: '',
            // shortName: undefined,
            shortName: '',
        });
        setSelectedPackaging(null);
    };

    const openEditModal = (packaging: Packaging) => {
        setModalMode('edit');
        setSelectedPackaging(packaging);
        reset({
            name: packaging.name,
            // shortName: packaging.shortName || undefined,
            shortName: packaging.shortName || '',
        });
    };

    const openDeleteModal = (packaging: Packaging) => {
        setModalMode('delete');
        setSelectedPackaging(packaging);
    };

    const closeModal = () => {
        setModalMode(null);
        reset({
            name: '',
            // shortName: undefined,
            shortName: '',
        });
        setSelectedPackaging(null);
    };

    const onSubmit = async (data: PackagingsFormFields) => {
        if (!modalMode) return;

        const payload = {
            name: data.name.trim(),
            shortName: data.shortName ? data.shortName.trim() : null,
        };

        try {
            if (modalMode === 'create') {
                await dispatch(createPackaging(payload)).unwrap();
            } else if (modalMode === 'edit' && selectedPackaging) {
                await dispatch(
                    updatePackaging({
                        id: selectedPackaging.id,
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
        if (!selectedPackaging) return;

        try {
            await dispatch(deletePackaging(selectedPackaging.id)).unwrap();
            closeModal();
        } catch {
            // error is already stored in Redux state and displayed in the UI
        }
    };

    useEffect(() => {
        dispatch(fetchPackagings());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            notify(error, 'error');
        }
        if (!error && success) {
            notify(success, 'success');
            // closeModal();
        }
    }, [error, success]);

    return (
        <>
        <section className='flex px-5 py-5 flex-col'>
            <h1 className='text-[42px] font-bold text-[#4d6d7e]'>Packagings</h1>

            <div className='mt-5 flex items-end'>
                <AdminActionButton action='create' onClick={openCreateModal} />
            </div>

            <div className='flex flex-col w-full border border-gray-300 rounded-md p-2 h-[550px] overflow-y-scroll scrollbar mt-5'>
                {loading ? (
                    <div className='flex justify-center items-center h-full'>
                        <LoadingSpinner message='Loading packagings...' />
                    </div>
                ) : error && packagings.length === 0 ? (
                    <div className='text-red-600 self-center justify-self-center text-[18px] font-bold'>
                        {error}
                    </div>
                ) : packagings.length > 0 ? (
                    packagings.map((packaging) => (
                        <div
                            key={packaging.id}
                            className='flex items-center justify-between hover:bg-[#E8DFD5] py-2 px-3 rounded-md'
                        >
                            <div className='flex items-center'>
                                <h2 className='text-[#4d6d7e] font-medium text-[18px]'>
                                    {packaging.name}
                                </h2>
                            </div>
                            <div className='*:first:ml-0 *:ml-2'>
                                <AdminActionButton
                                    action='edit'
                                    onClick={() => openEditModal(packaging)}
                                />
                                <AdminActionButton
                                    action='delete'
                                    onClick={() => openDeleteModal(packaging)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-[#4d6d7e] self-center justify-self-center text-[18px] font-bold'>
                        No packagings found
                    </div>
                )}
            </div>

            {modalMode && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
                    <div className='bg-[#F6EFE7] rounded-2xl shadow-xl w-full max-w-[500px] p-6'>
                        {modalMode === 'delete' ? (
                            <>
                                <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                                    Delete Packaging
                                </h2>
                                <p className='text-[#4d6d7e] mb-6'>
                                    Are you sure you want to delete{' '}
                                    <span className='font-semibold'>
                                        {selectedPackaging?.name}
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
                                    {modalMode === 'create' ? 'Create' : 'Edit'} Packaging
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
                                        <Input<PackagingsFormFields>
                                            type='text'
                                            id='name'
                                            placeholder='Enter packaging name'
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
                                        <Input<PackagingsFormFields>
                                            type='text'
                                            id='shortName'
                                            placeholder='Enter short name'
                                            register={register}
                                            errors={errors}
                                            errorMessage={errors.shortName?.message}
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
        <div>
            <ToastContainer />     
        </div>
      </>
    );
};

export default AdminPackagingsPage;
