import { useRouter } from "next/router";
import React, { memo, useCallback, useMemo } from "react";
import ActionList from "./ActionList";
import { ActionRoleProps } from "./ActionRole";

const enum Actions {
    delete = "Eliminar",
}

const roleActionsMap: Record<string, string[]> = {
    "super-admin": [Actions.delete],
    support: [Actions.delete],
    owner: [],
    user: [Actions.delete],
};

const allActions = [
    {
        id: "1",
        name: Actions.delete,
        description: "Eliminar",
        onClick: (id: string, handleDelete: (id: string) => void) => handleDelete(id),
    },
];

const ActionUsers: React.FC<ActionRoleProps> = ({id, userRole}) => {
    const router = useRouter();

    const handleDelete = useCallback((userId: string) => {
        console.log("Eliminar usuario");
    }, []);

    const availableActions = useMemo(() => {
return allActions
    .map(action => ({
        ...action,
        onClick: () => action.onClick(id, action.name === Actions.delete ? handleDelete : (id: string) => router.push(`/usuario?id=${id}`))
    }));
    }, [id, userRole, handleDelete, router]);

    return availableActions.length > 0 ? <div><ActionList actions={availableActions} resourceId={id}/></div> : null;
};

export default memo(ActionUsers);