import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { ProviderGigSchemaInputType } from '../../schemas/schema';
import { Field, FieldLabel } from '@/components/ui/field';
import ImageDropzone from '@/components/shared/ImageDropZone';

function ImagesTakingStep() {
    const form = useFormContext<ProviderGigSchemaInputType>();
  return (
    <div>
        <Field>
          <FieldLabel>Image 1</FieldLabel>
          <Controller
          name='image1'
          control={form.control}
          render={({field}) => (
              <ImageDropzone label='Image 1' value={field.value} onChange={field.onChange}/>
          )}
          />
        </Field>

         <Field>
          <FieldLabel>Image 2</FieldLabel>
          <Controller
          name='image2'
          control={form.control}
          render={({field}) => (
              <ImageDropzone label='Image 2' value={field.value} onChange={field.onChange}/>
          )}
          />
        </Field>

         <Field>
          <FieldLabel>Image 3</FieldLabel>
          <Controller
          name='image3'
          control={form.control}
          render={({field}) => (
              <ImageDropzone label='Image 3' value={field.value} onChange={field.onChange}/>
          )}
          />
        </Field>
    </div>
  )
}

export default ImagesTakingStep