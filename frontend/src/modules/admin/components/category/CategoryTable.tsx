import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "antd";
import useGetAllCategories from "../../hooks/useGetAllCategories";

export default function CategoryTable() {

 const {columns,dataSource} = useGetAllCategories();

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Categories
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