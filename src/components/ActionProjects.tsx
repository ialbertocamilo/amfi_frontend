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
  pause = "Pausar",
  cancel = "Cancelar",
}
const roleActionsMap: Record<string, string[]> = {
  "super-admin": [Actions.view, Actions.edit, Actions.pause, Actions.cancel],
  support: [Actions.view],
  owner: [Actions.view, Actions.pause, Actions.cancel],
  user: [Actions.view, Actions.edit, Actions.pause, Actions.cancel],
};

const ActionProjects: React.FC<ActionRoleProps> = ({ id, userRole }) => {
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
      description: "Editar ",
      onClick: (id: string) => handleEdit(id),
    },
    {
      id: "3",
      name: Actions.pause,
      description: "Pausar proyecto",
      onClick: (id:string) => handlePause(id),
    },
    {
      id: "4",
      name: Actions.cancel,
      description: "Cancelar ",
      onClick: (id:string) => console.log("Cancelar"),
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
