type StepperProps = {
    currentStep: number;
    steps: {
        title: string;
    }[];
};

function Stepper({ currentStep, steps }: StepperProps) {
    return (
        <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
                <div
                    key={step.title}
                    className="flex flex-col items-center flex-1"
                >
                    <div
                        className={`
                        w-10
                        h-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${
                            index < currentStep
                                ? "bg-green-500 text-white"
                                : index === currentStep
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                        }
                    `}
                    >
                        {index + 1}
                    </div>

                    <p className="mt-2">{step.title}</p>
                </div>
            ))}
        </div>
    );
}

export default Stepper;