import {
  useAdminAllUsersApiQuery,
  useAdminDeleteUserMutation,
} from "@/features/admin/adminApi";
import { Table, Modal, message } from "antd";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ColumnsType } from "antd/es/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "antd";
import useDebounce from "@/hooks/useDebounce";
function UserManagementComponent() {
  const [page, setPage] = useState(1);
  const [search,setSearch] = useState("");
  const debounceValue = useDebounce<string>(search,500);
  const [filterValue, setFilterValue] = useState<string>("");
  const { data } = useAdminAllUsersApiQuery({ page, filterValue,search:debounceValue });
  const [deleteUser] = useAdminDeleteUserMutation();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const handleDelete = (userId: string) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",

      onOk: async () => {
        try {
          await deleteUser({id:userId}).unwrap(); // call your API
          message.success("User deleted successfully");
        } catch (error) {
          message.error("Delete failed");
        }
      },
    });
  };
  const dataSource =
    data?.data?.users.map((user) => ({
      key: user._id,
      avatar: user.avatar?.url,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.split("T")[0],
    })) || [];
  const columns: ColumnsType<any> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatarUrl, record) => {
        return (
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>
              {record.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => navigate(`/admin/edit-user/${record.key}`)}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </>
      ),
    },
  ];
  const { Search } = Input;
  return (
    <div >
      <div className="mb-5 space-y-2  ">
        <div>
          <Select value={filterValue} onValueChange={setFilterValue}>
            <Label className="mb-2">Filter By status</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Search
          className="w-full"
          placeholder="Search user"
          enterButton="Search"
          size="large"
          allowClear
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        className="overflow-x-auto"
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.data.totalUsers,
          onChange: (p) => setPage(p),
        }}
      />
    </div>
  );
}

export default UserManagementComponent;
