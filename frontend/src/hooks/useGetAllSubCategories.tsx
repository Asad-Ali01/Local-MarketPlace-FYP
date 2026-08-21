import {
  useAdminDeleteSubCategoryMutation,
  useAdminGetAllSubCategoriesQuery,
} from "@/features/admin/adminApi";
import type { ColumnType } from "antd/es/table";
import { Button } from "@/components/ui/button";
import { Flex } from "antd";
import confirm from "antd/es/modal/confirm";
import toast from "react-hot-toast";
type SubCategoryType = {
  _id: string;
  categoryname: string;
  subcategoryname: string;
};
const useGetAllSubCategories = () => {
  const { data } = useAdminGetAllSubCategoriesQuery();
  const [deleteSubCategoryApi] = useAdminDeleteSubCategoryMutation();
  const subCategoryOptions = data?.data.map((category) => ({
    value: category._id,
    name: category.name,
  }));

  const deleteSubCategory = (id: string) => {
    confirm({
      title: "Delete SubCategory",
      content: "Are you sure you want to delete this SubCategory?",
      okText: "Delete",
      cancelText: "Cancel",
      okCancel: true,
      okType: "danger",
      centered: true,
      async onOk() {
        try {
          await deleteSubCategoryApi(id).unwrap();
        } catch (error: any) {
          toast.error("Failed to delete SubCategory");
        }
      },
    });
  };
  const dataSource: SubCategoryType[] =
    data?.data.map((category) => ({
      _id: category._id,
      categoryname: category.category.name,
      subcategoryname: category.name,
    })) ?? [];

  const columns: ColumnType<SubCategoryType>[] = [
    {
      title: "Category name",
      dataIndex: "categoryname",
      key: "categoryname",
    },
    {
      title: "SubCategory Name",
      dataIndex: "subcategoryname",
      key: "subcategoryname",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex>
            <Button variant="secondary">Edit</Button>
            <Button
              variant="destructive"
              onClick={() => deleteSubCategory(record._id)}
            >
              Delete
            </Button>
          </Flex>
        );
      },
    },
  ];

  return { dataSource, columns, subCategoryOptions };
};

export default useGetAllSubCategories;
