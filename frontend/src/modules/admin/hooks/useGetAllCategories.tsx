import { useAdminGetAllCategoriesQuery } from "@/features/admin/adminApi"

import type { ColumnType } from "antd/es/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Flex } from "antd";
type CategoryType = {
    name:string;
    icon:string
}
const useGetAllCategories = () => {
    const {data} = useAdminGetAllCategoriesQuery();

   
    const categoryOptions = data?.data?.map((category) => ({
        value:category._id,
        label:category.name
    })) ?? []


   const dataSource: CategoryType[] = data?.data.map((category) => ({
    _id:category._id,
    icon:category.icon.url,
    name:category.name,
    
   })) ?? []

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
        render:() => {
            return (
                <Flex>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                </Flex>
            )
        }
    }
   ]

  return {dataSource,columns,categoryOptions}
}

export default useGetAllCategories