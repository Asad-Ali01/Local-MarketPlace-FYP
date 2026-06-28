import CategoryTable from "../components/category/CategoryTable";
import CreateCategoryForm from "../components/category/CreateCategoryForm";
import CreateSubCategoryForm from "../components/category/CreateSubCategoryForm";
import SubCategoryTable from "../components/category/SubCategoryTable";

export default function CategoryManagement() {
  return (
    <div className="space-y-8">

      <div className="grid lg:grid-cols-2 gap-6">

        <CreateCategoryForm />

        <CreateSubCategoryForm />

      </div>

      <CategoryTable />

      <SubCategoryTable />

    </div>
  );
}