interface ProductFormProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProductFormProgress({ currentStep, totalSteps }: ProductFormProgressProps) {
    return (
        <div className='mb-4'>
            {/* Progress Indicator */}
            <div className='flex items-center gap-2 mt-4'>
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <div key={step} className='flex items-center'>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step === currentStep
                                    ? 'bg-[#4d6d7e] text-white'
                                    : step < currentStep
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            {step < currentStep ? '✓' : step}
                        </div>
                        {step < totalSteps && (
                            <div
                                className={`w-12 h-1 mx-1 ${
                                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className='mt-2 text-sm text-gray-600'>
                Step {currentStep} of {totalSteps}
            </div>
        </div>
    );
}
