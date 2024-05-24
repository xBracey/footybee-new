import { Navigate } from "@tanstack/react-router";
import Loading from "../../Loading";
import Box from "../../Box";

interface IAdminAddEdit {
  id?: string | number;
  children: React.ReactNode;
  isLoading: boolean;
  entityIsDefined: boolean;
  title: string;
}

const AdminAddEdit = ({
  id,
  children,
  isLoading,
  entityIsDefined,
  title,
}: IAdminAddEdit) => {
  if (isLoading) {
    return <Loading />;
  }

  if (id && !entityIsDefined) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center p-4">
      <Box className="max-w-xl">
        <h1 className="mb-4 text-lg font-semibold text-gray-700">
          {id ? "Edit" : "Add"} {title}
        </h1>
        {children}
      </Box>
    </div>
  );
};

export default AdminAddEdit;
