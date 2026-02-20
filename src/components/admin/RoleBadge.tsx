export const RoleBadge = ({ role }: { role: string }) => {
    const colors: Record<string, string> = {
        Admin: "bg-purple-100 text-purple-700",
        User: "bg-blue-100 text-blue-700",
        Manager: "bg-amber-100 text-amber-700"
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role] ?? "bg-slate-100 text-slate-600"}`}>
            {role}
        </span>
    );
};