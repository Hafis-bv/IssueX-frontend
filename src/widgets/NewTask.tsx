"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { CreateTaskPopap } from "./CreateTaskPopap";
import { AiOutlinePlus } from "react-icons/ai";

export const NewTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container className="pt-10">
      <button
        onClick={() => setOpen(true)}
        className="ml-auto flex items-center gap-2 rounded-lg border border-white/10 bg-[#111114] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1a1a1f] cursor-pointer"
      >
        <AiOutlinePlus size={16} />
        Add task
      </button>

      {open && <CreateTaskPopap onClose={() => setOpen(false)} />}
    </Container>
  );
};
