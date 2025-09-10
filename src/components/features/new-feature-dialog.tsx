"use client";

import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createFeatureAction } from "@/app/actions/feature-actions";
import type { FeatureStatus } from "@/domain/entities/Feature";

const CreateFeatureSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
});
type FormValues = z.infer<typeof CreateFeatureSchema>;

export function CreateFeatureDialog({
  onCreated,
}: {
  onCreated: (f: {
    id: string;
    title: string;
    description: string;
    status: FeatureStatus;
  }) => void;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateFeatureSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const created = await createFeatureAction(values);
      onCreated({
        id: created.id,
        title: created.title,
        description: created.description,
        status: created.status,
      });
      setOpen(false);
      form.reset();
      toast.success("Feature created");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to create feature");
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Add Feature</Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Feature</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              placeholder="Short title"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <Textarea
              id="description"
              rows={5}
              placeholder="What is the feature and why?"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
