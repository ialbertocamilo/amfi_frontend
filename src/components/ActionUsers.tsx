import React, {memo, useCallback, useMemo} from "react";
import ActionList from "./ActionList";
import {useRouter} from "next/router";
import {ActionRoleProps} from "./ActionRole";

const enum Actions {
    view = "Ver",
    delete = "Eliminar",
}

const roleActionsMap: Record<string, string[]> = {
    "super-admin": [Actions.view, Actions.delete],
    support: [Actions.view],
    owner: [Actions.delete],
    user: [],
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
    .filter(action => roleActionsMap[userRole]?.includes(action.name))
    .map(action => ({
        ...action,
        onClick: () => action.onClick(id, action.name === Actions.delete ? handleDelete : (id: string) => router.push(`/usuario?id=${id}`))
    }));
    }, [id, userRole, handleDelete, router]);

    return( <div><ActionList actions={availableActions} resourceId={id}/></div>)
};

export default memo(ActionUsers);