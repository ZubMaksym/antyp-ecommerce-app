import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProductFormNavigationProps {
    currentStep: number;
    totalSteps: number;
    submitting: boolean;
    modalMode: 'create' | 'edit';
    onPrevious: () => void;
    onCancel: () => void;
    onSubmit?: () => void;
}

export default function ProductFormNavigation({
    currentStep,
    totalSteps,
    submitting,
    modalMode,
    onPrevious,
    onCancel,
    onSubmit,
}: ProductFormNavigationProps) {
    return (
        <div className='flex justify-between gap-3 mt-4 pt-4 border-t border-[#4d6d7e]'>
            <Button
                apearence='secondary'
                classname='px-4 h-[36px]'
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    onPrevious();
                }}
                disabled={currentStep === 1 || submitting}
            >
                Previous
            </Button>
            <div className='flex gap-3'>
                <Button
                    apearence='secondary'
                    classname='px-4 h-[36px]'
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        onCancel();
                    }}
                    disabled={submitting}
                >
                    Cancel
                </Button>
                {currentStep < totalSteps ? (
                    <button
                        type='button'
                        onClick={onSubmit}
                        disabled={submitting}
                        className='px-4 h-[36px] rounded-lg transition duration-300 ease-in-out bg-[#4d6d7e] hover:bg-[#3E5865] text-white disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-4 h-[36px] rounded-lg transition duration-300 ease-in-out bg-[#4d6d7e] hover:bg-[#3E5865] text-white disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {submitting ? <LoadingSpinner /> : modalMode === 'create' ? 'Create' : 'Update'}
                    </button>
                )}
            </div>
        </div>
    );
}
