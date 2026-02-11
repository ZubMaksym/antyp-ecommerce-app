import { useState, useEffect } from 'react';
import useForbidBodyScroll from '@/hooks/useForbidBodyScroll';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { AdminModalProps } from '@/types/componentTypes';

const AdminModal = ({ modalMode, setModalMode, children }: AdminModalProps) => {
    const [portalRoot, setPortalRoot] = useState<Element | null>(null);

    useEffect(() => {
        const el = document.querySelector('#portal');
        setPortalRoot(el);
    }, []);

    useForbidBodyScroll(modalMode !== null, 20000);

    if (!portalRoot) return null;

    return ReactDOM.createPortal(
        <>
            {
                modalMode !== null && (
                    <aside>
                        <div
                            tabIndex={0}
                            onClick={() => setModalMode(null)}
                            className={classNames(
                                'fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-60 transition-opacity duration-550',
                            )}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F6EFE7] rounded-2xl shadow-xl w-full max-w-[700px] p-6'>
                                {/* <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                                    {modalMode === 'create' ? 'Add Product' : modalMode === 'edit' ? 'Edit Product' : 'Delete Product'}
                                </h2> */}
                                {children}
                            </div>
                        </div>
                    </aside>
                )
            },
        </>,
        portalRoot
    );
};

export default AdminModal;