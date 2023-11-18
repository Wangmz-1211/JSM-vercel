"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScoreCreateCard from "@/app/(root)/(private-pages)/score/components/score-create-card";
import ScoreCreateForm from "@/app/(root)/(private-pages)/score/components/score-create-form";
import { useState } from "react";

const ScoreCreateDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ScoreCreateCard />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-bold">Create a new score record</h2>
          <DialogDescription>
            Create a new record here, and then you can find it and edit it in
            the list. It`&apos;s recommended to name the record as
            `&apos;N2-YYYY-MM`&apos;.
          </DialogDescription>
        </DialogHeader>
        <ScoreCreateForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default ScoreCreateDialog;
