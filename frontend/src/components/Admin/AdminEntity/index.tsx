import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../../Button";

interface EntityBasic {
  id: string | number;
  name: string;
}

interface IAdminEntity {
  name: string;
  path: string;
  entities: EntityBasic[];
  onDelete: (id: string | number) => void;
  hasAddNew?: boolean;
}

const AdminEntity: React.FC<IAdminEntity> = ({
  name,
  path,
  entities,
  onDelete,
  hasAddNew = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const titleClass =
    "border-b-2 border-gray-200 bg-gray-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-600";

  const entityClass = "border-b border-gray-200 bg-white px-3 py-3 text-sm";

  return (
    <div
      className="mb-6 w-full rounded-lg bg-white p-3 shadow-2xl"
      onClick={toggleCollapse}
    >
      <div className="flex">
        <h2 className="flex-1 cursor-pointer p-1 text-lg font-semibold text-gray-700">
          {name} {!isCollapsed ? "+" : "-"}
        </h2>

        {hasAddNew && (
          <Link to={`/admin/$entity`} params={{ entity: path }}>
            <Button onClick={(e) => e.stopPropagation()}>Add New</Button>
          </Link>
        )}
      </div>
      {isCollapsed && (
        <div>
          <table className="mt-2 min-w-full leading-normal">
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
                    <Link
                      to={`/admin/$entity`}
                      params={{ entity: path }}
                      search={{ id: entity.id }}
                    >
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
