import { Container } from "@/components/Container";

export const TaskList = () => {
  return (
    <Container className="grid grid-cols-4 gap-8 mt-10">
      <div className="flex flex-col gap-5">
        <h1 className="border border-gray-300 rounded-md p-4 text-xl tracking-[3px]">Todo</h1>
        <div className="border border-gray-300 h-150 rounded-md p-4"></div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="border border-gray-300 rounded-md p-4 text-xl tracking-[3px]">In Progress</h1>
        <div className="border border-gray-300 h-150 rounded-md p-4"></div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="border border-gray-300 rounded-md p-4 text-xl tracking-[3px]">In Review</h1>
        <div className="border border-gray-300 h-150 rounded-md p-4"></div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="border border-gray-300 rounded-md p-4 text-xl tracking-[3px]">Done</h1> 
        <div className="border border-gray-300 h-150 rounded-md p-4"></div>
      </div>
    </Container>
  );
};