import React, {useEffect, useState} from "react";
import ActionList from "./ActionList";
import DeleteModal from "./DeleteModal";
import {useRouter} from "next/router";
import {ActionRoleProps} from "./ActionRole";
import {deleteDirector} from "@/api/directorApi";
import toast from "react-hot-toast";

const enum Actions {
    view = "Ver",
    edit = "Editar",
    delete = "Eliminar",
}

const roleActionsMap: Record<string, string[]> = {
    "super-admin": [Actions.view, Actions.delete],
    support: [Actions.view],
    owner: [Actions.view, Actions.delete],
    user: [Actions.view, Actions.delete],
};

const ActionDirectors: React.FC<ActionRoleProps> = ({id, userRole,onDelete}) => {
    const router = useRouter();
    const [actions, setActions] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const availableActions = allActions.filter((action) =>
            roleActionsMap[userRole]?.includes(action.name)
        );
        setActions(availableActions);
    }, [userRole]);

    const handleEdit = (projectId: string) => {
        router.push(`/ver-director?id=${projectId}`);
    };

    const handleDelete = (id: string) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        deleteDirector(deleteId as string).then(r => toast.success('Director eliminado'));
        setIsModalOpen(false);
        if (onDelete)
        onDelete()
    };

    const allActions = [
        {
            id: "3",
            name: Actions.delete,
            description: "Eliminar",
            onClick: (id: string) => handleDelete(id),
        },
    ];

    return (
        <div>
            <ActionList actions={actions} resourceId={id}/>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDelete={confirmDelete}
                itemName="director"
                id={deleteId}
            />
        </div>
    );
};

export default ActionDirectors;