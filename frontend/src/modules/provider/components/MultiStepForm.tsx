import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { type ProviderGigSchemaType,type ProviderGigSchemaInputType, providerGigSchema } from '../schemas/schema';
function MultiStepForm() {
    const [step,setStep] = useState(0);
    const form = useForm<ProviderGigSchemaInputType,null,ProviderGigSchemaType>({
        resolver:zodResolver(providerGigSchema),
        defaultValues:{
            title:"",
            description:"",
           status:"draft"
        }

    })
  return (
    <div>MultiStepForm</div>
  )
}

export default MultiStepForm