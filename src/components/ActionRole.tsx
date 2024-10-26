import React, { useMemo } from "react";
import ActionList from "./ActionList";
import {ActionRoleProps} from "@/interfaces/action-role-props.interface";


const view = (id: string) => {
  console.log(id);
};

const allActions = [
  {
    id: "1",
    name: "Ver",
    description: "Ver detalles",
    onClick: (id: string) => view(id),
  },
  {
    id: "2",
    name: "Editar",
    description: "Editar detalles",
    onClick: () => console.log("Editar"),
  },
  {
    id: "3",
    name: "Eliminar",
    description: "Eliminar detalles",
    onClick: () => console.log("Eliminar"),
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
}

const ActionRole: React.FC<ActionRoleProps> = ({ id, userRole }) => {
  const availableActions = useMemo(() => {
    console.log(userRole);
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