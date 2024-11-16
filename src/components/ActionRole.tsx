import React, { useMemo } from "react";
import ActionList from "./ActionList";


const view = (id: string) => {
  console.log(id);
};

const allActions = [
  {
    id: "2",
    name: "Editar",
    description: "Editar detalles",
    onClick: () => console.log("Editar"),
  },
];

const roleActionsMap: Record<string, string[]> = {
  "super-admin": ["Ver", "Editar", "Eliminar"],
  support: ["Ver"],
  owner: ["Ver", "Eliminar"],
  user: ["Ver"],
};
export interface ActionRoleProps {
  id: string;
  userRole: string;
  onDelete?: () => void;
}

const ActionRole: React.FC<ActionRoleProps> = ({ id, userRole }) => {
  const availableActions = useMemo(() => {
    return allActions.filter((action) =>
        roleActionsMap[userRole]?.includes(action.name)
    );
  }, [userRole]);

  return (
      <div>
        <ActionList actions={availableActions} resourceId={id} />
      </div>
  );
};

export default ActionRole;