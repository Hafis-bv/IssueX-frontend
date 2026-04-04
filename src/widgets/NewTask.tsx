"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { CreateTaskPopup } from "./CreateTaskPopup";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/Button";

export const NewTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container className="pt-10 mb-5">
      <Button
        onClick={() => setOpen(true)}
        className="ml-auto fixed bottom-4 right-4 lg:static flex items-center gap-2 !rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:border-primary hover:text-primary"
      >
        <AiOutlinePlus size={16} />
        Add task
      </Button>

      {open && <CreateTaskPopup onClose={() => setOpen(false)} />}
    </Container>
  );
};
