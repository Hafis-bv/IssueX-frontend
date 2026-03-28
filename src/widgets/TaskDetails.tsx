import { Task } from "@/types/task";
import { formatDate } from "@/utils/formateDate";
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

interface TaskDetailsProps {
  onClose: () => void;
  task: Task;
}

export const TaskDetails = ({ onClose, task }: TaskDetailsProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-6">
      <div className="w-3xl mx-auto rounded-2xl border border-[#1a1d24] bg-[#0d111a] p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">
              {task.title}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Created at: {formatDate(task.createdAt!)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#111622] transition cursor-pointer">
              <MdEdit size={25} />
            </button>

            <button className="p-2 rounded-md text-zinc-400 hover:text-red-400 hover:bg-[#111622] transition cursor-pointer">
              <MdDeleteOutline size={25} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-md text-zinc-400 hover:text-red-400 hover:bg-[#111622] transition cursor-pointer"
            >
              <GrClose size={25} />
            </button>
          </div>
        </div>

        <div>
          <span className="text-xs px-3 py-1 rounded-md border border-[#2a2f3a] text-zinc-300 bg-[#111622]">
            {task.status}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Description
          </p>
          <div className="rounded-xl border border-[#1a1d24] bg-[#080b13] p-4 text-sm text-zinc-300 leading-relaxed">
            {task.description}
          </div>
        </div>
      </div>
    </div>
  );
};
