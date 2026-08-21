import { useAdminDeleteCategoryMutation, useAdminGetAllCategoriesQuery } from "@/features/admin/adminApi"

import type { ColumnType } from "antd/es/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Flex } from "antd";
import { useMemo } from "react";
import confirm from "antd/es/modal/confirm";
import toast from "react-hot-toast";
type CategoryType = {
    _id:string;
    name:string;
    icon:string
}
const useGetAllCategories = () => {
    const {data} = useAdminGetAllCategoriesQuery();
    const [deleteCategoryApi] =  useAdminDeleteCategoryMutation()
   
    const categoryOptions = data?.data?.map((category) => ({
        value:category._id,
        label:category.name
    })) ?? []

    const deleteCategory = (id:string) => {
    confirm({
        title: "Delete Category",
        content: "Are you sure you want to delete this category?",
        okText: "Delete",
        cancelText: "Cancel",
        okCancel:true,
        okType: "danger",
        centered:true,
       async onOk() {
           try {
        await deleteCategoryApi(id).unwrap();
      
    } catch (error: any) {
      toast.error("Failed to delete category");
    }
        },

        onCancel() {
            console.log("Delete cancelled");
        },
    });
};
   const dataSource: CategoryType[] = useMemo(() => {
    return  data?.data.map((category) => ({
    _id:category._id,
    icon:category.icon.url,
    name:category.name,
    
   })) ?? []
   },[data])
   
   
  

   const columns: ColumnType<CategoryType>[] = [
    {
        title:"Icon",
        dataIndex:"icon",
        key:"icon",
       render:(iconUrl,record) => {
        return(
            <Avatar>
                <AvatarImage src={iconUrl}/>
                <AvatarFallback>
                {record.name.slice(0,1).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        )
       }
    },
    {
        title:"Name",
        dataIndex:"name",
        key:"name"
    },
    {
        title:"Action",
        dataIndex:"action",
        key:"action",
        render:(_,record) => {
            return (
                <Flex>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="destructive" onClick={() => deleteCategory(record._id)}>Delete</Button>
                </Flex>
            )
        }
    }
   ]

  return {dataSource,columns,categoryOptions}
}

export default useGetAllCategories