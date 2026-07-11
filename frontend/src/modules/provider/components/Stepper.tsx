import { useState, type ReactEventHandler } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  providerGigSchema,
  type ProviderGigSchemaInputType,
} from "../schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";
import BasicInfoStep from "./formSteps/BasicInfoStep";
import CategoryStep from "./formSteps/CategoryStep";
import { Button } from "@/components/ui/button";
import ImagesTakingStep from "./formSteps/ImagesTakingStep";
import { Key } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateGigApiMutation } from "@/features/gig/gigApi";
import ReviewStep from "./formSteps/ReviewStep";
import { useNavigate } from "react-router";

type StepperProps = {
  currentStep: number;
  steps: {
    title: string;
  }[];
};

function Stepper() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [createGigApi] = useCreateGigApiMutation();
  const methods = useForm<ProviderGigSchemaInputType>({
    resolver: zodResolver(providerGigSchema),
  });
  const validateCurrentStep = async () => {
    let valid = false;

    if (step == 1) {
      valid = await methods.trigger(["title", "description", "location"]);
    }
    if (step == 2) {
      valid = await methods.trigger(["category", "subcategory", "status"]);
    }
    if (step == 3) {
      valid = await methods.trigger(["image1", "image2", "image3"]);
    }
    return valid
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: ProviderGigSchemaInputType) => {
    console.log(data);
    const formData = new FormData();
    // text fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.location);
    formData.append("status", data.status);
    formData.append("category", data.category);
    formData.append("subCategory", data.subcategory);

    const targetSlots: number[] = [];
    // Image 1

    if (data.image1) {
      formData.append("images", data.image1);
      targetSlots.push(1);
    }

    // Image 2
    console.log("Image type", data.image1);
    if (data.image2) {
      formData.append("images", data.image2);
      targetSlots.push(2);
    }
    //  Image 3

    if (data.image3) {
      formData.append("images", data.image3);
      targetSlots.push(3);
    }
    formData.append("targetSlots", JSON.stringify(targetSlots));
    try {
       await createGigApi(formData).unwrap();
    } catch (error: any) {
      toast.error("Failed to create gig");
    }
  };
  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Category" },
    { id: 3, title: "Images" },
    { id: 4, title: "Review" },
  ];
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length) {
      const valid = await validateCurrentStep()
      if(valid){
        setStep(prev => prev + 1)
      }
      return; // block submission unless truly on the last step
    }
    await methods.handleSubmit(onSubmit)(e);
    methods.reset()
    navigate('/provider/dashboard')
  };
  console.log("HEre is tep: ", step);
  return (
    <div className="min-h-screen flex items-center justify-center">

    <FormProvider  {...methods}>
      <form
        onSubmit={onFormSubmit}
        className={`space-y-6 my-7  flex flex-col border-2 shadow-2xl p-6 items-center max-w-3xl w-full rounded  justify-center py-4  `}
      >
          <section className="flex items-center   w-full pl-10   justify-center ">
            {steps.map((item, index) => (
              <div key={item.id} className="flex flex-1 ">
                {/* Circle + Title */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                 
                    className={`flex justify-center items-center rounded-full h-10 w-10
                          ${
                            step > item.id
                              ? "bg-green-600 border-green-600 text-white"
                              : step == item.id
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-gray-300 border-gray-300 text-gray-500"
                          }
                          `}
                  >
                    {step > item.id ? "✔" : item.id}
                  </div>
                  {/* Title */}
                  <div>{item.title}</div>
                </div>
                {/* Now That borderline */}
                {index !== steps.length - 1 && (
                  <div
                    className={` flex-1 mt-5 h-1 w-20 
                          ${step > item.id ? "bg-green-600" : "bg-gray-600"}
                      `}
                  />
                )}
              </div>
            ))}
          </section>
        <div className=" w-full sm:max-w-3xl space-y-2">
          {step == 1 && <BasicInfoStep />}
          {step == 2 && <CategoryStep />}
          {step == 3 && <ImagesTakingStep />}
          {step == 4 && <ReviewStep />}
          <div className="flex gap-3  justify-end">
            {step > 1 && (
              <Button
                className="justify-self-end"
                onClick={previousStep}
                type="button"
                variant="default"
              >
                Previous
              </Button>
            )}

           
            {step < 4 && (
              <Button type="submit">
                Next
              </Button>
            )}
            {step == 4 && <Button type="submit">Submit</Button>}
          </div>
        </div>
      </form>
    </FormProvider>
    </div>
  );
}

export default Stepper;
