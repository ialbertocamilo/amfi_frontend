import { updateProjectStatus } from "@/api/projectApi";
import { ProjectStatus } from "@/mappers/project.mapper";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import ActionList from "./ActionList";
import { ActionRoleProps } from "./ActionRole";

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
        id: "1",
        name: Actions.edit,
        description: "Editar ",
        onClick: (id: string, router: any) => router.push(`/proyecto?id=${id}`),
    },
];

const ActionProjects: React.FC<ActionRoleProps> = ({ id, userRole }) => {
    const router = useRouter();

    const handlePause = useCallback((projectId: string) => {
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
    }, [id, userRole, router]);

    return (
            <ActionList actions={availableActions} resourceId={id} />
    );
};

export default ActionProjects;