"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useTransition } from "react";
import { deleteScore } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ScoreDelete = ({
  id,
  setOpen,
}: {
  id: string;
  setOpen: React.Dispatch<any>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button className="bg-jred float-left w-20 mr-2">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            score record and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            disabled={pending}
            className="bg-jred relative"
            onClick={() => {
              startTransition(async () => {
                await deleteScore({ id: id });
                setOpen(false);
                setOpenDialog(false);
                toast({
                  title: "Deleted!",
                  description: "Your score has been deleted.",
                });
              });
            }}
          >
            Delete{" "}
            {pending && <Loader2 className="animate-spin absolute bottom-2" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ScoreDelete;
