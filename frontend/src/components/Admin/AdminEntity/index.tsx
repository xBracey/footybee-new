import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../../Button";

interface EntityBasic {
  id: string;
  name: string;
}

interface IAdminEntity {
  name: string;
  path: string;
  entities: EntityBasic[];
  onDelete: (id: string) => void;
}

const AdminEntity: React.FC<IAdminEntity> = ({
  name,
  path,
  entities,
  onDelete,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const titleClass =
    "border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600";

  const entityClass = "border-b border-gray-200 bg-white px-5 py-5 text-sm";

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-2xl">
      <h2
        onClick={toggleCollapse}
        className="cursor-pointer p-2 text-xl font-semibold text-gray-700"
      >
        {name} {!isCollapsed ? "+" : "-"}
      </h2>
      {isCollapsed && (
        <div>
          <Link href={`/admin/${path}/add`}>
            <Button>Add New</Button>
          </Link>
          <table className="mt-4 min-w-full leading-normal">
            <thead>
              <tr>
                <th className={titleClass}>ID</th>
                <th className={titleClass}>Name</th>
                <th className={titleClass}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.map((entity) => (
                <tr key={entity.id}>
                  <td className={entityClass}>{entity.id}</td>
                  <td className={entityClass}>{entity.name}</td>
                  <td className={`w-48 ${entityClass}`}>
                    <Link href={`/admin/${path}/edit`}>
                      <Button className="mr-2">Edit</Button>
                    </Link>

                    <Button
                      buttonType="danger"
                      onClick={() => onDelete(entity.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AdminEntity;
