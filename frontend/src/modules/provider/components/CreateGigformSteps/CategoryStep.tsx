import { Controller, useFormContext } from 'react-hook-form'
import type { ProviderGigSchemaInputType } from '../../schemas/schema'
import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useGetAllCategories from '@/modules/admin/hooks/useGetAllCategories';
import useGetAllSubCategories from '@/modules/admin/hooks/useGetAllSubCategories';
import { Error } from '@/components/shared/Error';


function CategoryStep() {
    const form = useFormContext<ProviderGigSchemaInputType>();
    const {categoryOptions,} = useGetAllCategories();
    const {subCategoryOptions} = useGetAllSubCategories();
  return (
    <div>
        <Field>
            <FieldLabel>Select Category</FieldLabel>
            <Controller
            name='category'
            control={form.control}
            render={({field}) => (
                <Select onValueChange={async(value) => {
                    field.onChange(value)
                    form.trigger("category")
                }} >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                          { categoryOptions.map((category) => (
                    <SelectItem 
                    key={category.value} 
                    value={category.value}
                    
                    >
                        {category.label}
                        </SelectItem>
                ))}
                    </SelectGroup>
                    </SelectContent>
                <Error msg={form.formState.errors.category?.message}/>
                </Select>
            )}
            />
        </Field>

        {/* Select sub category */}
         <Field>
            <FieldLabel>Select Sub Category</FieldLabel>
            <Controller
            name='subcategory'
            control={form.control}
            render={({field}) => (
                <Select  onValueChange={async(value) => {
                    field.onChange(value)
                    form.trigger("subcategory")
                }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Sub Category"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                          { subCategoryOptions?.map((category) => (
                    <SelectItem key={category.value} value={category.value}>{category.name}</SelectItem>
                ))   }
                    </SelectGroup>
                    </SelectContent>
                <Error msg={form.formState.errors.subcategory?.message}/>

                </Select>
            )}
            />
        </Field>
          <Field>
            <FieldLabel>Select Status</FieldLabel>
            <Controller
            name='status'
            control={form.control}
            render={({field}) => (
                <Select  onValueChange={async(value) => {
                    field.onChange(value)
                    form.trigger("status")
                }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                       <SelectItem value='draft'>Draft</SelectItem>
                       <SelectItem value='published'>Published</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                <Error msg={form.formState.errors.status?.message}/>

                </Select>
            )}
            />
        </Field>
    </div>
  )
}

export default CategoryStep