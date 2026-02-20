import { useState } from "react";
import type { Role } from "../../models/models";
import {useAdminRolesActions} from "../../hooks/admin/useAdminRolesActions.ts";

interface Props {
    role: Role;
    onClose: () => void;
}

export const AdminRolesModal = ({ role, onClose }: Props) => {

    const { update, remove } = useAdminRolesActions();
    const isSystemAdmin = role.isAdmin;

    const [name, setName] = useState(role.name);
    const [priority, setPriority] = useState(role.priority);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        await update.mutateAsync({
            id: role.id,
            data: { name, priority }
        });
        onClose();
    };

    const handleDelete = async () => {
        await remove.mutateAsync(role.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">

                <h2 className="text-xl font-bold">
                    Роль №{role.id}
                </h2>

                <div className="space-y-4">

                    {/* Название */}
                    <div>
                        <label className="block text-xs uppercase text-slate-400 mb-2">
                            Название
                        </label>

                        {isEditing ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800"
                            />
                        ) : (
                            <div className="px-3 py-2 bg-slate-100 rounded-lg">
                                {role.name}
                            </div>
                        )}
                    </div>

                    {/* Приоритет */}
                    <div>
                        <label className="block text-xs uppercase text-slate-400 mb-2">
                            Приоритет
                        </label>

                        {isEditing ? (
                            <input
                                type="number"
                                value={priority}
                                onChange={(e) => setPriority(Number(e.target.value))}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800"
                            />
                        ) : (
                            <div className="px-3 py-2 bg-slate-100 rounded-lg font-semibold text-emerald-600">
                                {role.priority}
                            </div>
                        )}
                    </div>

                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
                    >
                        Закрыть
                    </button>

                    {!isSystemAdmin && !isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Редактировать
                        </button>
                    )}

                    {!isSystemAdmin && isEditing && (
                        <button
                            onClick={handleSave}
                            disabled={update.isPending}
                            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {update.isPending ? "Сохранение..." : "Сохранить"}
                        </button>
                    )}

                    {!isSystemAdmin && (
                        <button
                            onClick={handleDelete}
                            disabled={remove.isPending}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                        >
                            {remove.isPending ? "Удаление..." : "Удалить"}
                        </button>
                    )}

                    {isSystemAdmin && (
                        <span className="text-xs text-slate-400 italic">
            Системная роль — изменение запрещено
        </span>
                    )}

                </div>

            </div>
        </div>
    );
};