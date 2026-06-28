import React from 'react'
import { Field } from '@/components/ui/field';
import {Label} from '@/components/ui/label'

interface CustomeFieldProps{
    label:string;
    error?:string;
    children:React.ReactNode;
}

function CustomField({
    label,
    error,
    children
}:CustomeFieldProps) {
  return (
    <Field className='space-y-2'>
       <Label>{label}</Label>
       {children}

       {error && (
        <p className='text-sm text-red-500'>{error}</p>
       )}
    </Field>
  )
}

export default CustomField