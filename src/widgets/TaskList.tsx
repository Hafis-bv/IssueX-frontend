import { Container } from "@/components/Container";
import { TaskCard } from "@/components/TaskCard";
import { Bounce, ToastContainer } from "react-toastify";

export const TaskList = () => {
  return (
    <Container className="grid grid-cols-4 gap-6 mt-10 bg-[#080b13]">
      <div className="flex flex-col gap-4">
        <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
          To do
        </h1>
        <TaskCard status="TODO" />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
          In Progress
        </h1>
        <TaskCard status="IN_PROGRESS" />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
          In Review
        </h1>
        <TaskCard status="IN_REVIEW" />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
          Done
        </h1>
        <TaskCard status="DONE" />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        toastClassName={() =>
          "relative flex min-h-10 rounded-lg border border-[#1a1d24] bg-[#0d111a] text-zinc-200 p-4"
        }
        progressClassName="!bg-[#5b48ee]"
      />
    </Container>
  );
};
