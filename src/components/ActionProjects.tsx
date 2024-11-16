import React, { useMemo, useCallback } from "react";
import ActionList from "./ActionList";
import { useRouter } from "next/router";
import { ActionRoleProps } from "./ActionRole";
import { updateProjectStatus } from "@/api/projectApi";
import { ProjectStatus } from "@/mappers/project.mapper";

const enum Actions {
    view = "Ver",
    edit = "Editar",
    pause = "Pausar",
    cancel = "Cancelar",
}

const roleActionsMap: Record<string, string[]> = {
    "super-admin": [Actions.view, Actions.edit, Actions.pause, Actions.cancel],
    support: [Actions.view],
    owner: [Actions.edit, Actions.pause, Actions.cancel],
    user: [Actions.view, Actions.edit, Actions.pause, Actions.cancel],
};

const allActions = [
    {
        id: "2",
        name: Actions.edit,
        description: "Editar ",
        onClick: (id: string, router: any) => router.push(`/proyecto?id=${id}`),
    },
    {
        id: "3",
        name: Actions.pause,
        description: "Pausar proyecto",
        onClick: (id: string, handlePause: (id: string) => void) => handlePause(id),
    },
    {
        id: "4",
        name: Actions.cancel,
        description: "Cancelar ",
        onClick: (id: string) => console.log("Cancelar"),
    },
];

const ActionProjects: React.FC<ActionRoleProps> = ({ id, userRole }) => {
    const router = useRouter();

    const handlePause = useCallback((projectId: string) => {
        console.log("Pausar proyecto");
        updateProjectStatus(projectId, ProjectStatus.Paused).then(() => {
            location.reload();
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const availableActions = useMemo(() => {
        return allActions.map(action => ({
            ...action,
            onClick: () => action.onClick(id, action.name === Actions.pause ? handlePause : router)
        })).filter(action =>
            roleActionsMap[userRole]?.includes(action.name)
        );
    }, [id, userRole, handlePause, router]);

    return (
        <div>
            <ActionList actions={availableActions} resourceId={id} />
        </div>
    );
};

export default ActionProjects;