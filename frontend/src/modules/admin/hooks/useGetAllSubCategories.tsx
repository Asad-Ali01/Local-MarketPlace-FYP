import { useAdminGetAllSubCategoriesQuery } from "@/features/admin/adminApi"
import type { ColumnType } from "antd/es/table";
import { Button } from "@/components/ui/button";
import { Flex } from "antd";
type SubCategoryType = {
    categoryname:string;
    subcategoryname:string;
}
const useGetAllSubCategories = () => {
    const {data} = useAdminGetAllSubCategoriesQuery();

   const dataSource : SubCategoryType[] = data?.data.map((category) => ({
    _id:category._id,
    categoryname:category.category.name,
    subcategoryname:category.name,
   })) ?? []

   const columns: ColumnType<SubCategoryType>[] = [
    {
        title:"Category name",
        dataIndex:"categoryname",
        key:"categoryname",
    },
    {
        title:"SubCategory Name",
        dataIndex:"subcategoryname",
        key:"subcategoryname"
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

  return {dataSource,columns}
}

export default useGetAllSubCategories