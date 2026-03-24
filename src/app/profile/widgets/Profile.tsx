"use client";

import { useAuth } from "@/context/userContext";
import { formatDate } from "@/utils/formateDate";

export default function Profile() {
  const { user } = useAuth();

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <section className="mx-auto max-w-4xl p-6 bg-[#080b13]">
      <div className="overflow-hidden rounded-3xl border border-[#1a1d24] bg-[#0d111a] text-white">
        <div className="h-28 bg-gradient-to-r from-primary to-blue-500" />

        <div className="px-6 pb-8">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#0d111a] bg-[#111622] text-3xl font-bold text-zinc-100">
                {userInitial}
              </div>
              <div className="pb-1">
                <h1 className="text-2xl font-semibold leading-tight text-zinc-100">
                  {user?.name}
                </h1>
                <p className="text-sm text-zinc-400">{user?.email}</p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400 border border-emerald-500/20">
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
    <div className="rounded-2xl border border-[#1a1d24] bg-[#111622] p-4">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 break-all text-base text-zinc-100">{value}</p>
    </div>
  );
}
