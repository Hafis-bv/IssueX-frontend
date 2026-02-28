"use client";

import { useAuth } from "@/context/userContext";
import { formatDate } from "@/utils/formateDate";

export default function Profile() {
    const { user } = useAuth();

    const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

    return (
        <section className="mx-auto max-w-4xl p-6">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0E1320] text-white shadow-lg">
                <div className="h-28 bg-gradient-to-r from-primary to-blue-500" />

                <div className="px-6 pb-8">
                    <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#0E1320] bg-[#1F2937] text-3xl font-bold">
                                {userInitial}
                            </div>
                            <div className="pb-1">
                                <h1 className="text-2xl font-semibold leading-tight">
                                    {user?.name}
                                </h1>
                                <p className="text-sm text-gray-300">{user?.email}</p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit items-center rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
                            Since: {formatDate(user?.createdAt || "")}
                        </span>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <InfoCard label="Name" value={user?.name} />
                        <InfoCard label="Email" value={user?.email} />
                        <InfoCard label="ID" value={user?.id} />
                    </div>
                </div>
            </div>
        </section>
    );
}

type InfoCardProps = {
    label: string;
    value: string | undefined;
};

function InfoCard({ label, value }: InfoCardProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-gray-400">{label}</p>
            <p className="mt-1 break-all text-base text-white">{value}</p>
        </div>
    );
}