import React, { useMemo } from "react";
import ActionList from "./ActionList";
import { useRouter } from "next/router";
import { ActionRoleProps } from "./ActionRole";

const view = (id: string) => {
  console.log(id);
};

const enum Actions {
  view = "Ver",
  edit = "Editar",
  delete = "Eliminar",
}

new File




const roleActionsMap: Record<string, string[]> = {
  "super-admin": [Actions.view,  Actions.delete],
  support: [Actions.view],
  owner: [Actions.view, Actions.delete],
  user: [Actions.view,   Actions.delete],
};

const ActionDirectors: React.FC<ActionRoleProps> = ({ id, userRole }) => {
    const router = useRouter();
  const handleEdit = (projectId: string) => {
    router.push(`/proyecto?id=${projectId}`);
  };

  const handlePause = (projectId: string) => {
    console.log("Pausar proyecto");
  }

  const allActions = [
    {
      id: "1",
      name: Actions.view,
      description: "Ver detalles",
      onClick: (id: string) => router.push(`/detalle-proyecto?id=${id}`),
    },
    {
      id: "2",
      name: Actions.edit,
      description: "Editar"


      onClick: (id: string) => handleEdit(id)
    },
    {
      id: "3",
      name: Actions.delete,
      description: "Eliminar ",
      onClick: (id:string) => console.log("Eliminar"),
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

export default ActionDirectors;
