"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { createScore } from "../actions";

const message =
  'The title must be in the specific formation. e.g. "N2-2023-12"';

const formSchema = z.object({
  title: z.string().min(10, { message }).max(10, { message }),
});

const ScoreCreateForm = ({
  setDialogOpen,
}: {
  setDialogOpen: React.Dispatch<any>;
}) => {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = ( rawData: Record<string, any>)=> {
    const title = rawData.title;
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", title);
      await createScore(formData);
      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          disabled={pending}
          type="submit"
          className="float-right relative"
        >
          Create
          {pending && (
            <Loader2 className="animate-spin absolute bottom-2 text-secondary " />
          )}
        </Button>
      </form>
    </Form>
  );
};
export default ScoreCreateForm;
