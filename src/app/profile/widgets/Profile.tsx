"use client";

import { useAuth } from "@/context/userContext";
import { formatDate } from "@/utils/formateDate";

export default function Profile() {
  const { user } = useAuth();

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <section className="min-h-screen bg-[#080b13] px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1a1d24] bg-[#0d111a] text-white">
        <div className="h-24 sm:h-28 bg-gradient-to-r from-primary to-blue-500" />

        <div className="px-4 pb-6 sm:px-6 sm:pb-8">
          <div className="-mt-10 sm:-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:items-end sm:text-left sm:gap-4">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 border-[#0d111a] bg-[#111622] text-2xl sm:text-3xl font-bold text-zinc-100">
                {userInitial}
              </div>

              <div className="pb-0 sm:pb-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold leading-tight text-zinc-100 break-words">
                  {user?.name}
                </h1>
                <p className="mt-1 text-sm text-zinc-400 break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            <span className="inline-flex w-full sm:w-fit justify-center items-center rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs sm:text-sm text-emerald-400 border border-emerald-500/20">
              Since: {formatDate(user?.createdAt || "")}
            </span>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
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
    <div className="rounded-xl sm:rounded-2xl border border-[#1a1d24] bg-[#111622] p-4">
      <p className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1 break-all text-sm sm:text-base text-zinc-100">
        {value}
      </p>
    </div>
  );
}
