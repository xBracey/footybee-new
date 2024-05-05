import { Navigate } from "@tanstack/react-router";
import Loading from "../../Loading";

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
      <div className="mx-auto w-full max-w-xl rounded-lg border border-gray-300 bg-white p-4 shadow-md">
        <h1 className="mb-4 text-lg font-semibold text-gray-700">
          {id ? "Edit" : "Add"} {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AdminAddEdit;
