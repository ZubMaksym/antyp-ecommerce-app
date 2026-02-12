interface ProductFormProgressProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProductFormProgress({ currentStep, totalSteps }: ProductFormProgressProps) {
    return (
        <div className='mb-4'>
            {/* Progress Indicator */}
            <div className='flex items-center justify-around gap-0 mt-4 *:flex-1 *:last:flex-0'>
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <div key={step} className='flex items-center justify-center'>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step === currentStep
                                    ? 'bg-[#4d6d7e] text-white'
                                    : step < currentStep
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-400 text-gray-600'
                            }`}
                        >
                            {step < currentStep ? '✓' : step}
                        </div>
                        {step < totalSteps && (
                            <div
                                className={`flex flex-1 h-1 ${
                                    step < currentStep ? 'bg-green-500' : 'bg-gray-400'
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
