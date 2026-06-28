import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "antd";
import useGetAllSubCategories from "../../hooks/useGetAllSubCategories";

export default function SubCategoryTable() {

  const {columns,dataSource} = useGetAllSubCategories();

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          SubCategories
        </CardTitle>

      </CardHeader>

      <CardContent>

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />

      </CardContent>

    </Card>
  );
}