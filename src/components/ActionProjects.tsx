import React, { useMemo } from "react";
import ActionList from "./ActionList";
import { ActionRoleProps } from "@/interfaces/action-role-props.interface";
import { useRouter } from "next/router";

const view = (id: string) => {
  console.log(id);
};

const roleActionsMap: Record<string, string[]> = {
  "super-admin": ["Ver", "Editar", "Pausar", "Cancelar"],
  support: ["Ver"],
  owner: ["Ver", "Eliminar"],
  user: ["Ver"],
};

const ActionProjects: React.FC<ActionRoleProps> = ({ id, userRole }) => {
  const router = useRouter();  
  const handleEdit = (projectId: string) => {
    router.push(`/proyecto?id=${projectId}`);
};
  const allActions = [
    {
      id: "1",
      name: "Ver",
      description: "Ver detalles",
      onClick: (id: string) =>router.push(`/detalle-proyecto?id=${id}`),
    },
    {
      id: "2",
      name: "Editar",
      description: "Editar ",
      onClick: (id:string) => handleEdit(id),
    },
    {
      id: "3",
      name: "Pausar",
      description: "Pausar proyecto",
      onClick: () => console.log("Pausar"),
    },
    {
      id: "4",
      name: "Cancelar",
      description: "Cancelar ",
      onClick: () => console.log("Cancelar"),
    },
  ];
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

export default ActionProjects;
